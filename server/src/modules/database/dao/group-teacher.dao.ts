import { AbstractDao } from './abstract.dao';
import { GroupTeacherEntity } from '../entity/group-teacher.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupTeacherDao extends AbstractDao<GroupTeacherEntity> {
  target = GroupTeacherEntity;
}
