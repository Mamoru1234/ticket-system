import { Injectable } from '@nestjs/common';
import { LessonEntity } from '../database/entity/lesson.entity';
import { CreateLessonPayload } from './dto/create-lesson.payload';
import { UserEntity } from '../database/entity/user.entity';
import { StudentGroupDao } from '../database/dao/student-group.dao';
import { Connection } from 'typeorm';
import { StudentGroupService } from '../student-group/student-group.service';
import { LessonDao } from '../database/dao/lesson.dao';

@Injectable()
export class LessonService {
  constructor(
    private readonly studentGroupDao: StudentGroupDao,
    private readonly studentGroupService: StudentGroupService,
    private readonly connection: Connection,
    private readonly lessonDao: LessonDao,
  ) {
  }
  async createLesson(data: CreateLessonPayload, user: UserEntity): Promise<LessonEntity> {
    const group = await this.studentGroupService.getById(data.groupId, user);
    return this.lessonDao.save(this.connection.manager, {
      timestamp: data.timestamp,
      group,
    });
  }

  async getLessonsByGroup(groupId: string, user: UserEntity): Promise<LessonEntity[]> {
    const group = await this.studentGroupService.getById(groupId, user);
    return this.lessonDao.find(this.connection.manager, {
      where: {
        group,
      },
      order: {
        timestamp: 'DESC',
      },
    });
  }

  async getById(lessonId: string, user: UserEntity): Promise<LessonEntity> {
    const lesson = await this.lessonDao.findOne(this.connection.manager, {
      where: {
        id: lessonId,
      },
    });
    // to validate lesson access
    await this.studentGroupService.getById(lesson.groupId, user);
    return lesson;
  }
}
