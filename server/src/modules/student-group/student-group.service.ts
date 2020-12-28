import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../database/entity/user.entity';
import { StudentGroupEntity } from '../database/entity/student-group.entity';
import { StudentGroupDao } from '../database/dao/student-group.dao';
import { Connection } from 'typeorm';
import { CreateGroupPayload } from './dto/create-group.payload';
import { GroupTeacherDao } from '../database/dao/group-teacher.dao';
import { UserRole } from '../../constants/user-role.enum';

@Injectable()
export class StudentGroupService {
  constructor(
    private readonly studentGroupDao: StudentGroupDao,
    private readonly groupTeacherDao: GroupTeacherDao,
    private readonly connection: Connection,
  ) {
  }
  async getAllTeacherGroups(user: UserEntity): Promise<StudentGroupEntity[]> {
    const groupRelations = await user.teacher;
    return this.studentGroupDao.findAllByTeachers(this.connection.manager, groupRelations);
  }

  async getById(groupId: string, user: UserEntity): Promise<StudentGroupEntity> {
    const group = await this.studentGroupDao.findOne(this.connection.manager, {
      where: {
        id: groupId,
      },
    });
    if (!group) {
      throw new BadRequestException(`No group found: ${groupId}`);
    }
    await this.validateGroupAccess(user, group);
    return group;
  }

  createGroup(data: CreateGroupPayload, user: UserEntity): Promise<StudentGroupEntity> {
    return this.connection.transaction(async txn => {
      const group = await this.studentGroupDao.save(txn, data);
      await this.groupTeacherDao.save(txn, {
        group,
        teacher: user,
      });
      return group;
    });
  }

  async validateGroupAccess(user: UserEntity, group: StudentGroupEntity): Promise<void> {
    if (user.role === UserRole.ADMIN) {
      return;
    }
    const teachers = await group.teachers;
    const isTeacher = teachers.some((it) => it.teacherId === user.id);
    if (!isTeacher) {
      throw new BadRequestException(`Cannot access ${group.id}`);
    }
  }
}
