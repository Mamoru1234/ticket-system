import { AbstractDao } from './abstract.dao';
import { StudentGroupEntity } from '../entity/student-group.entity';
import { Service } from 'typedi';

@Service()
export class StudentGroupDao extends AbstractDao<StudentGroupEntity> {
  target = StudentGroupEntity;
}
