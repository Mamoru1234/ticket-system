import { Service } from 'typedi';
import { UserDao } from '../models/dao/user.dao';
import { AppContext } from '../constants/app-context.type';
import { DatabaseService } from './database.service';
import { UserEntity } from '../models/entity/user.entity';
import { AuthenticationError } from 'apollo-server';
import { TokenUtils } from '../utils/TokenUtils';
import { LoggerUtils } from '../utils/LoggerUtils';
import { TokenData } from '../constants/token-data.type';
import { UserRole } from '../constants/user-role.enum';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class SecurityService {
  constructor(
    private readonly userDao: UserDao,
    private readonly dbService: DatabaseService,
  ) {
  }

  async getUserFromContext(context: AppContext): Promise<UserEntity> {
    const userToken = context.userToken;
    if (!userToken) {
      throw new AuthenticationError('No token in context');
    }
    const txn = await this.dbService.getEntityManager(context);
    let tokenData: TokenData | undefined;
    try {
      tokenData = await TokenUtils.verify(userToken);
    } catch (e) {
      logger.debug('Token invalid: ', e);
    }
    if (!tokenData) {
      throw new AuthenticationError('Token invalid');
    }
    const user = await this.userDao.findOne(txn, {
      where: {
        email: tokenData.email,
      },
    });
    if (!user) {
      logger.warn('Token issued for user not in DB');
      throw new AuthenticationError('Token invalid');
    }
    return user;
  }

  async verifyRoles(context: AppContext, roles: UserRole[]): Promise<void> {
    const user = await this.getUserFromContext(context);
    if (!roles.includes(user.role)) {
      throw new AuthenticationError('Invalid role access');
    }
  }
}
