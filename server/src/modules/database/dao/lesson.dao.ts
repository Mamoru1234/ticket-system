import { Injectable } from '@nestjs/common';
import { AbstractDao } from './abstract.dao';
import { LessonEntity } from '../entity/lesson.entity';

@Injectable()
export class LessonDao extends AbstractDao<LessonEntity>{
  target = LessonEntity;
}
