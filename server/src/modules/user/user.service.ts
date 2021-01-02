import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../database/entity/user.entity';
import { UserDao } from '../database/dao/user.dao';
import { Connection, In } from 'typeorm';
import { CreateUserPayload } from './dto/create-user.payload';
import { ActivateUserPayload } from './dto/activate-user.payload';
import { MAIL_PROVIDER_TOKEN, MailProvider } from '../mail/provider/mail-provider.interface';
import { AuthService } from '../auth/auth.service';
import { activateUserMail } from './mail/activate-user.mail';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userDao: UserDao,
    private readonly connection: Connection,
    @Inject(MAIL_PROVIDER_TOKEN) private readonly mailProvider: MailProvider,
  ) {
  }

  findAll(): Promise<UserEntity[]> {
    return this.userDao.find(this.connection.manager);
  }

  async getById(userId: number): Promise<UserEntity> {
    const user = await this.userDao.findOne(this.connection.manager, {
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async getByIds(userIds: number[]): Promise<UserEntity[]> {
    if (userIds.length === 0) {
      throw new BadRequestException('Empty array');
    }
    return this.userDao.find(this.connection.manager, {
      where: {
        id: In(userIds),
      },
    });
  }

  createUser(payload: CreateUserPayload): Promise<UserEntity> {
    return this.userDao.save(this.connection.manager, payload);
  }

  async activateUser(payload: ActivateUserPayload): Promise<UserEntity> {
    const activatedUser = await this.connection.transaction(async tx => {
      const user = await this.userDao.findOne(tx, {
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        throw new BadRequestException(`User with id: ${payload.id} not found`);
      }
      if (user.email) {
        throw new BadRequestException(`User with id: ${payload.id} already has email`);
      }
      user.email = payload.email;
      return this.userDao.save(tx, user);
    });
    const resetLink = await this.authService.createSetPasswordLink(activatedUser);
    await this.mailProvider.sendMail(activateUserMail(activatedUser, resetLink));
    return activatedUser;
  }
}
