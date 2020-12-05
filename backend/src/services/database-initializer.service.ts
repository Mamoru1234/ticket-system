import { UserService } from './user.service';
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
      await this.userService.registerUser({
        password: 'admin',
        firstName: 'Oleksiy',
        lastName: 'Gontar',
        role: UserRole.ADMIN,
        email: 'admin@mail.com',
      }, txn);
      const student1 = await this.userService.registerUser({
        password: 'user',
        firstName: 'Oleksiy',
        lastName: 'Gone',
        role: UserRole.STUDENT,
        email: 'student@mail.com',
      }, txn);
      await this.userService.registerUser({
        password: 'user',
        firstName: 'Anna',
        lastName: 'Gontar',
        role: UserRole.STUDENT,
        email: 'another_student@mail.com',
      }, txn);
      const student2 = await this.userService.registerUser({
        firstName: 'Anna',
        lastName: 'Gotta',
        role: UserRole.STUDENT,
        email: 'gotta_student@mail.com',
      }, txn);
      const teacher = await this.userService.registerUser({
        firstName: 'Taras',
        lastName: 'Gontar',
        role: UserRole.TEACHER,
        email: 'teacher@test.com',
        password: 'teacher',
      }, txn);
      const group = await this.studentGroupDao.save({
        name: 'Test group',
      }, txn);
      await this.groupMemberDao.save({
        group,
        student: student1,
      }, txn);
      await this.groupMemberDao.save({
        group,
        student: student2,
      }, txn);
      await this.groupTeacherDao.save({
        teacher,
        group,
      }, txn);
    });
  }
}
