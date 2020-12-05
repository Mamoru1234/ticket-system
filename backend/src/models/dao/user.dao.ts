import { Service } from 'typedi';
import { AbstractDao } from './abstract.dao';
import { UserEntity } from '../entity/user.entity';

@Service()
export class UserDao extends AbstractDao<UserEntity> {
  target = UserEntity;
}
