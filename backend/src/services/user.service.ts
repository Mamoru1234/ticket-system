import { UserEntity } from '../models/entity/user.entity';
import { DeepPartial, EntityManager } from 'typeorm';
import { Service } from 'typedi';
import { LoggerUtils } from '../utils/LoggerUtils';
import { createHmac } from 'crypto';
import { APP_PASS_SECRET } from '../config';
import { UserDao } from '../models/dao/user.dao';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class UserService {
  constructor(
    private readonly userDao: UserDao,
  ) {
  }

  async registerUser(user: DeepPartial<UserEntity>, txn: EntityManager): Promise<UserEntity> {
    logger.info(`Registering user: ${user.email}`);
    if (user.password) {
      const hash = createHmac('sha512', APP_PASS_SECRET);
      hash.update(user.password);
      user.password = hash.digest().toString('base64');
    }
    return this.userDao.save(user, txn);
  }
}
