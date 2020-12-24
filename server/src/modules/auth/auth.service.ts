import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDao } from '../database/dao/user.dao';
import { Connection } from 'typeorm';
import { createHmac } from 'crypto';
import { UserEntity } from '../database/entity/user.entity';
import { TokenResponse } from './dto/token.response';
import { JwtService } from '@nestjs/jwt';

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
    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
