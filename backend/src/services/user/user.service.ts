import { UserEntity } from '../../models/entity/user.entity';
import { DeepPartial, EntityManager } from 'typeorm';
import { Service } from 'typedi';
import { LoggerUtils } from '../../utils/LoggerUtils';
import { createHmac } from 'crypto';
import { APP_PASS_SECRET } from '../../config';
import { UserDao } from '../../models/dao/user.dao';
import { AppContext } from '../../constants/app-context.type';
import { SecurityService } from '../security.service';
import { UserRole } from '../../constants/user-role.enum';
import { DatabaseService } from '../database.service';
import { StudentGroupDao } from '../../models/dao/student-group.dao';
import { CreateUserInput, InitUserInput } from './user.input';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class UserService {
  resolvers: any;
  constructor(
    private readonly userDao: UserDao,
    private readonly dbService: DatabaseService,
    private readonly securityService: SecurityService,
    private readonly studentGroupDao: StudentGroupDao,
  ) {
    this.resolvers = {
      Query: {
        users: this.getAllUsers.bind(this),
        me: this.getCurrentUser.bind(this),
      },
      Mutation: {
        createUser: this.createUser.bind(this),
        initUser: this.initUser.bind(this),
      },
      User: {
        groups: this.getUserGroups.bind(this),
      },
    };
  }

  async getAllUsers(_parent: unknown, _args: unknown, context: AppContext) {
    await this.securityService.verifyRoles(context, [UserRole.ADMIN]);
    const txn = await this.dbService.getEntityManager(context);
    return this.userDao.find(txn);
  }

  async createUser(_parent: unknown, args: CreateUserInput, context: AppContext) {
    await this.securityService.verifyRoles(context, [UserRole.ADMIN, UserRole.TEACHER]);
    const txn = await this.dbService.getEntityManager(context);
    return this.registerUser(txn, {
      ...args,
      role: UserRole.STUDENT,
    });
  }

  async initUser(_parent: unknown, args: InitUserInput, context: AppContext) {
    await this.securityService.verifyRoles(context, [UserRole.ADMIN, UserRole.TEACHER]);
    const txn = await this.dbService.getEntityManager(context);
    const user = await this.userDao.findOne(txn, {
      where: {
        id: args.id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.email) {
      throw new Error('User already has email');
    }
    user.email = args.email;
    UserService.setUserPassword(user, 'init');
    return this.userDao.save(txn, user);
  }

  getCurrentUser(_parent: unknown, _args: unknown, context: AppContext): Promise<UserEntity> {
    return this.securityService.getUserFromContext(context);
  }

  async getUserGroups(parent: UserEntity, _args: unknown, context: AppContext) {
    const members = await parent.participate;
    const txn = await this.dbService.getEntityManager(context);
    return this.studentGroupDao.findAllByMembers(txn, members);
  }

  async registerUser(txn: EntityManager, user: DeepPartial<UserEntity>): Promise<UserEntity> {
    logger.info(`Registering user: ${user.firstName} ${user.lastName}`);
    if (user.password) {
      UserService.setUserPassword(user, user.password);
    }
    return this.userDao.save(txn, user);
  }

  private static setUserPassword(user: DeepPartial<UserEntity>, password: string) {
    const hash = createHmac('sha512', APP_PASS_SECRET);
    hash.update(password);
    user.password = hash.digest().toString('base64');
  }
}
