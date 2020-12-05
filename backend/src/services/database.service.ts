import { Service } from 'typedi';
import { Connection, createConnection } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../models/entity/user.entity';
import { StudentGroupEntity } from '../models/entity/student-group.entity';
import { GroupMemberEntity } from '../models/entity/group-member.entity';
import { GroupTeacherEntity } from '../models/entity/group-teacher.entity';
import { APP_DB_HOST, APP_DB_PASS } from '../config';

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
  getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity> {
    if (!this.connection) {
      throw new Error('Db is not connected');
    }
    return this.connection.getRepository(target);
  }
  async close(): Promise<void> {
    if (!this.connection) {
      return;
    }
    await this.connection.close();
  }
}
