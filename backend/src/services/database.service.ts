import { Service } from 'typedi';
import { Connection, createConnection } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../models/entity/user.entity';
import { StudentGroupEntity } from '../models/entity/student-group.entity';
import { GroupMemberEntity } from '../models/entity/group-member.entity';

@Service()
export class DatabaseService {
  private connection?: Connection;
  async connect(): Promise<void> {
    this.connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      username: 'server',
      password: 'app_secret',
      entities: [
        UserEntity,
        StudentGroupEntity,
        GroupMemberEntity,
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
