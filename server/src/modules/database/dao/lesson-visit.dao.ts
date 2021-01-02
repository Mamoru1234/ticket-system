import { AbstractDao } from './abstract.dao';
import { LessonVisitEntity } from '../entity/lesson-visit.entity';

export class LessonVisitDao extends AbstractDao<LessonVisitEntity> {
  target = LessonVisitEntity;
}
