import { AbstractDao } from './abstract.dao';
import { UserEntity } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDao extends AbstractDao<UserEntity> {
  target = UserEntity;
}
