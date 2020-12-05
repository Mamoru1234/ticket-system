import { DatabaseService } from './database.service';
import { UserEntity } from '../models/entity/user.entity';
import { DeepPartial } from 'typeorm';
import { Service } from 'typedi';
import { LoggerUtils } from '../utils/LoggerUtils';
import { createHmac } from 'crypto';
import { APP_PASS_SECRET } from '../config';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class UserService {
  constructor(
    private readonly dbService: DatabaseService,
  ) {
  }

  async registerUser(user: DeepPartial<UserEntity>): Promise<UserEntity> {
    logger.info(`Registering user: ${user.email}`);
    if (user.password) {
      const hash = createHmac('sha512', APP_PASS_SECRET);
      hash.update(user.password);
      user.password = hash.digest().toString('base64');
    }
    return this.dbService.getRepository(UserEntity).save(user);
  }
}
