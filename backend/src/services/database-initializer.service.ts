import { UserService } from './user/user.service';
import { Service } from 'typedi';
import { UserRole } from '../constants/user-role.enum';
import { DatabaseService } from './database.service';
import { StudentGroupDao } from '../models/dao/student-group.dao';
import { GroupMemberDao } from '../models/dao/group-member.dao';
import { GroupTeacherDao } from '../models/dao/group-teacher.dao';

@Service()
export class DatabaseInitializerService {
  constructor(
    private readonly userService: UserService,
    private readonly groupMemberDao: GroupMemberDao,
    private readonly groupTeacherDao: GroupTeacherDao,
    private readonly studentGroupDao: StudentGroupDao,
    private readonly dbService: DatabaseService,
  ) {
  }

  async init(): Promise<void> {
    await this.dbService.runInTx(async txn => {
      await this.userService.registerUser(txn, {
        password: 'admin',
        firstName: 'Oleksiy',
        lastName: 'Gontar',
        role: UserRole.ADMIN,
        email: 'admin@mail.com',
      });
      const student1 = await this.userService.registerUser(txn, {
        password: 'user',
        firstName: 'Oleksiy',
        lastName: 'Gone',
        role: UserRole.STUDENT,
        email: 'student@mail.com',
      });
      await this.userService.registerUser(txn, {
        password: 'user',
        firstName: 'Anna',
        lastName: 'Gontar',
        role: UserRole.STUDENT,
        email: 'another_student@mail.com',
      });
      const student2 = await this.userService.registerUser(txn, {
        firstName: 'Anna',
        lastName: 'Gotta',
        role: UserRole.STUDENT,
      });
      await this.userService.registerUser(txn, {
        firstName: 'Micha',
        lastName: 'Gotta',
        role: UserRole.STUDENT,
      });
      const teacher = await this.userService.registerUser(txn, {
        firstName: 'Taras',
        lastName: 'Gontar',
        role: UserRole.TEACHER,
        email: 'teacher@test.com',
        password: 'teacher',
      });
      const group = await this.studentGroupDao.save(txn, {
        name: 'Test group',
      });
      await this.groupMemberDao.save(txn, {
        group,
        student: student1,
      });
      await this.groupMemberDao.save(txn, {
        group,
        student: student2,
      });
      await this.groupTeacherDao.save(txn, {
        teacher,
        group,
      });
    });
  }
}
