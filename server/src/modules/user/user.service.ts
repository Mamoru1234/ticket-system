import { Injectable } from '@nestjs/common';
import { UserEntity } from '../database/entity/user.entity';
import { UserDao } from '../database/dao/user.dao';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userDao: UserDao,
    private readonly connection: Connection,
  ) {
  }

  findAll(): Promise<UserEntity[]> {
    return this.userDao.find(this.connection.manager);
  }
}
