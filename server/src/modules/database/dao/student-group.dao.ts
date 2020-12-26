import { AbstractDao } from './abstract.dao';
import { StudentGroupEntity } from '../entity/student-group.entity';
import { GroupMemberEntity } from '../entity/group-member.entity';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GroupTeacherEntity } from '../entity/group-teacher.entity';

@Injectable()
export class StudentGroupDao extends AbstractDao<StudentGroupEntity> {
  target = StudentGroupEntity;

  findAllByMembers(txn: EntityManager, members: GroupMemberEntity[]): Promise<StudentGroupEntity[]> {
    const groupIds = members.map((it) => it.groupId);
    return txn.getRepository(this.target).find({
      where: {
        id: In(groupIds),
      },
    });
  }

  findAllByTeachers(txn: EntityManager, teachers: GroupTeacherEntity[]): Promise<StudentGroupEntity[]> {
    const groupIds = teachers.map((it) => it.groupId);
    return txn.getRepository(this.target).find({
      where: {
        id: In(groupIds),
      },
    });
  }
}
