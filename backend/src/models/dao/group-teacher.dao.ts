import { AbstractDao } from './abstract.dao';
import { GroupTeacherEntity } from '../entity/group-teacher.entity';
import { Service } from 'typedi';

@Service()
export class GroupTeacherDao extends AbstractDao<GroupTeacherEntity> {
  target = GroupTeacherEntity;
}
