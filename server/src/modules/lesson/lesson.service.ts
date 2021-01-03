import { BadRequestException, Injectable } from '@nestjs/common';
import { LessonEntity } from '../database/entity/lesson.entity';
import { CreateLessonPayload } from './dto/create-lesson.payload';
import { UserEntity } from '../database/entity/user.entity';
import { StudentGroupDao } from '../database/dao/student-group.dao';
import { Connection } from 'typeorm';
import { StudentGroupService } from '../student-group/student-group.service';
import { LessonDao } from '../database/dao/lesson.dao';
import { AddLessonVisitPayload } from './dto/add-lesson-visit.payload';
import { LessonVisitDao } from '../database/dao/lesson-visit.dao';
import { UserDao } from '../database/dao/user.dao';
import { LessonVisitEntity } from '../database/entity/lesson-visit.entity';
import { TicketDao } from '../database/dao/ticket.dao';
import { TicketEntity } from '../database/entity/ticket.entity';

@Injectable()
export class LessonService {
  constructor(
    private readonly studentGroupDao: StudentGroupDao,
    private readonly studentGroupService: StudentGroupService,
    private readonly connection: Connection,
    private readonly lessonDao: LessonDao,
    private readonly lessonVisitDao: LessonVisitDao,
    private readonly userDao: UserDao,
    private readonly ticketDao: TicketDao,
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

  async addLessonVisit(lessonId: string, data: AddLessonVisitPayload, user: UserEntity): Promise<void> {
    const lesson = await this.lessonDao.findOne(this.connection.manager, {
      where: {
        id: lessonId,
      },
    });
    // to validate lesson access
    await this.studentGroupService.getById(lesson.groupId, user);
    const student = await this.userDao.findOne(this.connection.manager, {
      where: {
        id: data.userId
      },
    });
    if (!student) {
      throw new BadRequestException(`User with id ${data.userId} not found`);
    }
    const visit = await this.lessonVisitDao.findOne(this.connection.manager, {
      where: {
        student,
        lesson,
      },
    });
    if (visit) {
      throw new BadRequestException('User already marked as visited');
    }
    let ticket: TicketEntity;
    if (data.ticketId) {
      ticket = await this.ticketDao.findOne(this.connection.manager, {
        where: {
          id: data.ticketId,
          student,
        },
      });
      if (ticket.visitsLeft === 0) {
        throw new BadRequestException('You cannot use expired ticket');
      }
      ticket.visitsLeft--;
      await this.ticketDao.save(this.connection.manager, ticket);
    }
    await this.lessonVisitDao.save(this.connection.manager, {
      lesson,
      student,
      ticket,
      markedBy: user,
    });
  }

  async getStudentVisits(lessonId: string, user: UserEntity): Promise<LessonVisitEntity[]> {
    const lesson = await this.lessonDao.findOne(this.connection.manager, {
      where: {
        id: lessonId,
      },
    });
    // to validate lesson access
    await this.studentGroupService.getById(lesson.groupId, user);
    return this.lessonVisitDao.find(this.connection.manager, {
      where: {
        lesson,
      },
    });
  }
}
