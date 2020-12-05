import { UserService } from './user.service';
import { Service } from 'typedi';
import { UserRole } from '../constants/user-role.enum';
import { DatabaseService } from './database.service';
import { Repository } from 'typeorm/repository/Repository';
import { GroupMemberEntity } from '../models/entity/group-member.entity';
import { StudentGroupEntity } from '../models/entity/student-group.entity';

@Service()
export class DatabaseInitializerService {
  private groupMemberRepo: Repository<GroupMemberEntity>;
  private groupsRepo: Repository<StudentGroupEntity>;
  constructor(
    private readonly userService: UserService,
    dbService: DatabaseService,
  ) {
    this.groupMemberRepo = dbService.getRepository(GroupMemberEntity);
    this.groupsRepo = dbService.getRepository(StudentGroupEntity);
  }

  async init(): Promise<void> {
    await this.userService.registerUser({
      password: 'admin',
      firstName: 'Oleksiy',
      lastName: 'Gontar',
      role: UserRole.ADMIN,
      email: 'admin@mail.com',
    });
    const student1 = await this.userService.registerUser({
      password: 'user',
      firstName: 'Oleksiy',
      lastName: 'Gone',
      role: UserRole.STUDENT,
      email: 'student@mail.com',
    });
    await this.userService.registerUser({
      password: 'user',
      firstName: 'Anna',
      lastName: 'Gontar',
      role: UserRole.STUDENT,
      email: 'another_student@mail.com',
    });
    const student2 = await this.userService.registerUser({
      firstName: 'Anna',
      lastName: 'Gotta',
      role: UserRole.STUDENT,
      email: 'gotta_student@mail.com',
    });
    const group = await this.groupsRepo.save({
      name: 'Test group',
    });
    await this.groupMemberRepo.save({
      group,
      student: student1,
    });
    await this.groupMemberRepo.save({
      group,
      student: student2,
    });
  }
}
