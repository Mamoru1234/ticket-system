import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDao } from '../database/dao/user.dao';
import { Connection } from 'typeorm';
import { createHmac } from 'crypto';
import { UserEntity } from '../database/entity/user.entity';
import { TokenResponse } from './dto/token.response';
import { JwtService } from '@nestjs/jwt';
import { stringify } from 'querystring';
import { SetPasswordPayload } from './dto/set-password.payload';
import { TokenPayload, TokenType } from './dto/token.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userDao: UserDao,
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
  ) {
  }

  async getAll(): Promise<void> {
    console.log(await this.userDao.find(this.connection.manager));
  }

  hashPassword(email: string, password: string): string {
    const hash = createHmac('sha512', this.configService.get('APP_PASS_SECRET'));
    hash.update(email);
    hash.update(password);
    return hash.digest().toString('base64');
  }

  async createToken(user: UserEntity): Promise<TokenResponse> {
    const payload: TokenPayload = {
      sub: user.id,
      username: user.email,
      tokenType: TokenType.AUTH,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }

  async createSetPasswordLink(targetUser: UserEntity): Promise<string> {
    const setPasswordUrl = this.configService.get('SET_PASSWORD_URL');
    const payload: TokenPayload = {
      sub: targetUser.id,
      username: targetUser.email,
      tokenType: TokenType.SET_PASSWORD,
    };
    const setPasswordToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15d',
    });
    const params = stringify({
      token: setPasswordToken,
    })
    return `${setPasswordUrl}?${params}`;
  }

  async setPassword(data: SetPasswordPayload): Promise<void> {
    const payload = await this.verifyAsync(data.token);
    if (!payload) {
      throw new BadRequestException('Wrong token');
    }
    if (payload.tokenType !== TokenType.SET_PASSWORD) {
      throw new BadRequestException('Invalid token type');
    }
    return this.connection.transaction(async txn => {
      const user = await this.userDao.findOne(txn, {
        where: {
          id: payload.sub,
        },
      });
      if (user.email !== payload.username) {
        throw new BadRequestException('User email changed');
      }
      user.password = this.hashPassword(user.email, data.password);
      await this.userDao.save(txn, user);
    });
  }

  verifyAsync(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token).catch((e) => {
      console.error('Verify token error: ', e);
      return null;
    })
  }
}
