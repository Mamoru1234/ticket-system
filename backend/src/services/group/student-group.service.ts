import { Service } from 'typedi';
import { StudentGroupEntity } from '../../models/entity/student-group.entity';
import { StudentGroupDao } from '../../models/dao/student-group.dao';
import { AppContext } from '../../constants/app-context.type';
import { UserRole } from '../../constants/user-role.enum';
import { SecurityService } from '../security.service';
import { DatabaseService } from '../database.service';
import { AddStudentGroupInput, CreateGroupInput } from './student-group.input';
import { GroupTeacherDao } from '../../models/dao/group-teacher.dao';
import { UserDao } from '../../models/dao/user.dao';
import { GroupMemberDao } from '../../models/dao/group-member.dao';

@Service()
export class StudentGroupService {
  resolvers: any;
  constructor(
    private readonly studentGroupDao: StudentGroupDao,
    private readonly securityService: SecurityService,
    private readonly dbService: DatabaseService,
    private readonly userDao: UserDao,
    private readonly groupTeacherDao: GroupTeacherDao,
    private readonly groupMemberDao: GroupMemberDao,
  ) {
    this.resolvers = {
      Query: {
        groups: this.getAllGroups.bind(this),
      },
      Mutation: {
        createGroup: this.createGroup.bind(this),
        addStudentToGroup: this.addStudentToGroup.bind(this),
      },
    };
  }

  async getAllGroups(_parent: unknown, _args: unknown, context: AppContext): Promise<StudentGroupEntity[]> {
    await this.securityService.verifyRoles(context, [UserRole.ADMIN]);
    const txn = await this.dbService.getEntityManager(context);
    return this.studentGroupDao.find(txn);
  }

  async createGroup(_parent: unknown, args: CreateGroupInput, context: AppContext): Promise<StudentGroupEntity> {
    await this.securityService.verifyRoles(context, [UserRole.ADMIN, UserRole.TEACHER]);
    const user = await this.securityService.getUserFromContext(context);
    const txn = await this.dbService.getEntityManager(context);
    const group = await this.studentGroupDao.save(txn, {
      name: args.name,
    });
    if (user.role === UserRole.TEACHER) {
      await this.groupTeacherDao.save(txn, {
        group,
        teacher: user,
      });
    }
    return group;
  }

  async addStudentToGroup(_parent: unknown, args: AddStudentGroupInput, context: AppContext): Promise<StudentGroupEntity> {
    await this.securityService.verifyRoles(context, [UserRole.ADMIN, UserRole.TEACHER]);
    const txn = await this.dbService.getEntityManager(context);
    const group = await this.studentGroupDao.findOne(txn, {
      where: {
        id: args.groupId,
      },
    });
    if (!group) {
      throw new Error('Group not found');
    }
    const student = await this.userDao.findOne(txn, {
      where: {
        id: args.studentId,
      },
    });
    if (!student) {
      throw new Error('Student not found');
    }
    const member = await this.groupMemberDao.findOne(txn, {
      where: {
        groupId: group.id,
        studentId: student.id,
      },
    });
    if (member) {
      throw new Error('Student is already in group');
    }
    await this.groupMemberDao.save(txn, {
      group,
      student,
    });
    return group;
  }
}
