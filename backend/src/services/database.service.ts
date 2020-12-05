import { Service } from 'typedi';
import { Connection, createConnection } from 'typeorm';
import { UserEntity } from '../models/entity/user.entity';
import { StudentGroupEntity } from '../models/entity/student-group.entity';
import { GroupMemberEntity } from '../models/entity/group-member.entity';
import { GroupTeacherEntity } from '../models/entity/group-teacher.entity';
import { APP_DB_HOST, APP_DB_PASS } from '../config';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { AppContext } from '../constants/app-context.type';
import { LoggerUtils } from '../utils/LoggerUtils';

export const QUERY_RUNNER_KEY = '__typeorm_query_runner';
export const ENTITY_MANAGER_KEY = '__typeorm_entity_manager';

const logger = LoggerUtils.getLogger(__filename);

@Service()
export class DatabaseService {
  private connection?: Connection;
  async connect(): Promise<void> {
    this.connection = await createConnection({
      type: 'postgres',
      host: APP_DB_HOST,
      username: 'server',
      password: APP_DB_PASS,
      entities: [
        UserEntity,
        StudentGroupEntity,
        GroupMemberEntity,
        GroupTeacherEntity,
      ],
    });
  }
  runInTx<T>(runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T> {
    if (!this.connection) {
      throw new Error('Db is not connected');
    }
    return this.connection.transaction(runInTransaction);
  }

  async getEntityManager(context: AppContext): Promise<EntityManager> {
    if (!this.connection) {
      throw new Error('Db is not connected');
    }
    if (context.serverData[ENTITY_MANAGER_KEY]) {
      return context.serverData[ENTITY_MANAGER_KEY];
    }
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    logger.debug('Context transaction started');
    context.serverData[QUERY_RUNNER_KEY] = queryRunner;
    const entityManager = this.connection.createEntityManager(queryRunner);
    context.serverData[ENTITY_MANAGER_KEY] = entityManager;
    return entityManager;
  }

  async close(): Promise<void> {
    if (!this.connection) {
      return;
    }
    await this.connection.close();
  }
}
