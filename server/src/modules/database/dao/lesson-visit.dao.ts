import { AbstractDao } from './abstract.dao';
import { LessonVisitEntity } from '../entity/lesson-visit.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LessonVisitDao extends AbstractDao<LessonVisitEntity> {
  target = LessonVisitEntity;
}
