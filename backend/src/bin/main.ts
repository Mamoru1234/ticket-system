import 'reflect-metadata';
import { LoggerUtils } from '../utils/LoggerUtils';
import { Container } from 'typedi';
import { DatabaseService } from '../services/database.service';
import { UserEntity } from '../models/entity/user.entity';
import { StudentGroupEntity } from '../models/entity/student-group.entity';
import { GroupMemberEntity } from '../models/entity/group-member.entity';

LoggerUtils.configure();
const logger = LoggerUtils.getLogger(__filename);

export async function main(): Promise<void> {
  logger.info('Starting server...');
  const dbService = Container.get(DatabaseService);
  await dbService.connect();
  logger.info('Db connected');
  const userRepo = dbService.getRepository(UserEntity);
  const user = await userRepo.save({
    role: 'sample',
    lastName: 'sample',
    firstName: 'sample',
    password: 'test',
  });
  logger.info(user);
  const groupRepo = dbService.getRepository(StudentGroupEntity);
  const group = await groupRepo.save({
    name: 'Some group',
  });
  logger.info(group);
  const members = dbService.getRepository(GroupMemberEntity);
  await members.save({
    group,
    student: user,
  });
  await dbService.close();
}

main().catch((e) => {
  logger.error('Error in main', e);
});
