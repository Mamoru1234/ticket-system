import { UserEntity } from '../models/entity/user.entity';
import { DeepPartial, EntityManager } from 'typeorm';
import { Service } from 'typedi';
import { LoggerUtils } from '../utils/LoggerUtils';
import { createHmac } from 'crypto';
import { APP_PASS_SECRET } from '../config';
import { UserDao } from '../models/dao/user.dao';
import { AppContext } from '../constants/app-context.type';
import { SecurityService } from './security.service';
import { UserRole } from '../constants/user-role.enum';
import { DatabaseService } from './database.service';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class UserService {
  resolvers: any;
  constructor(
    private readonly userDao: UserDao,
    private readonly dbService: DatabaseService,
    private readonly securityService: SecurityService,
  ) {
    this.resolvers = {
      Query: {
        users: this.getAllUsers.bind(this),
      },
    };
  }

  async getAllUsers(_parent: unknown, _args: unknown, context: AppContext) {
    await this.securityService.verifyRoles(context, [UserRole.ADMIN]);
    const txn = await this.dbService.getEntityManager(context);
    return this.userDao.find(txn);
  }

  async registerUser(txn: EntityManager, user: DeepPartial<UserEntity>): Promise<UserEntity> {
    logger.info(`Registering user: ${user.email}`);
    if (user.password) {
      const hash = createHmac('sha512', APP_PASS_SECRET);
      hash.update(user.password);
      user.password = hash.digest().toString('base64');
    }
    return this.userDao.save(txn, user);
  }
}
