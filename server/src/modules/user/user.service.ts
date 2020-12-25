import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../database/entity/user.entity';
import { UserDao } from '../database/dao/user.dao';
import { Connection } from 'typeorm';
import { CreateUserPayload } from './dto/create-user.payload';
import { ActivateUserPayload } from './dto/activate-user.payload';
import { MAIL_PROVIDER_TOKEN, MailProvider } from '../mail/provider/mail-provider.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userDao: UserDao,
    private readonly connection: Connection,
    @Inject(MAIL_PROVIDER_TOKEN) private readonly mailProvider: MailProvider,
  ) {
  }

  findAll(): Promise<UserEntity[]> {
    return this.userDao.find(this.connection.manager);
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
      user.email = payload.email;
      return this.userDao.save(tx, user);
    });
    await this.mailProvider.sendMail({
      targetEmail: activatedUser.email,
      subject: 'User activation',
      html: '<h1>Please activate your user</h1>'
    });
    return activatedUser;
  }
}
