import { DatabaseService } from './database.service';
import { UserEntity } from '../models/entity/user.entity';
import { hash, genSaltSync } from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { Service } from 'typedi';
import { LoggerUtils } from '../utils/LoggerUtils';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class UserService {
  private readonly salt: string;
  constructor(
    private readonly dbService: DatabaseService,
  ) {
    this.salt = genSaltSync(10);
    logger.info('Salt: ', this.salt);
  }

  async registerUser(user: DeepPartial<UserEntity>): Promise<UserEntity> {
    if (user.password) {
      user.password = await hash(user.password, this.salt);
    }
    return this.dbService.getRepository(UserEntity).save(user);
  }
}
