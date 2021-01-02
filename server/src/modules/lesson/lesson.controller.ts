import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../guards/role.guard';
import { Role } from '../../decorators/role.decorator';
import { UserRole } from '../../constants/user-role.enum';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../database/entity/user.entity';
import { LessonResponse } from '../../dto/lesson.response';
import { LessonService } from './lesson.service';
import { CreateLessonPayload } from './dto/create-lesson.payload';
import { plainToClass } from 'class-transformer';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constants/class-transform.options';

@Controller('lessons')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
  ) {
  }
  @Post('create')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async createGroup(
    @User() user: UserEntity,
    @Body() data: CreateLessonPayload,
  ): Promise<LessonResponse> {
    const lesson = await this.lessonService.createLesson(data, user);
    return plainToClass(LessonResponse, lesson, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Get('/by-group/:groupId')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getByGroup(
    @Param('groupId') groupId: string,
    @User() user: UserEntity,
  ): Promise<LessonResponse[]> {
    const lessons = await this.lessonService.getLessonsByGroup(groupId, user);
    return plainToClass(LessonResponse, lessons, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Get(':lessonId')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getById(
    @Param('lessonId') lessonId: string,
    @User() user: UserEntity,
  ): Promise<LessonResponse> {
    const lesson = await this.lessonService.getById(lessonId, user);
    return plainToClass(LessonResponse, lesson, DEFAULT_TRANSFORM_OPTIONS);
  }
}
