import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StudentGroupResponse } from '../../dto/student-group.response';
import { Role } from '../../decorators/role.decorator';
import { UserRole } from '../../constants/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../guards/role.guard';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../database/entity/user.entity';
import { StudentGroupService } from './student-group.service';
import { plainToClass } from 'class-transformer';
import { CreateGroupPayload } from './dto/create-group.payload';

@Controller('student-group')
export class StudentGroupController {
  constructor(
    private readonly studentGroupService: StudentGroupService,
  ) {
  }
  @Get('teacher')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getAllTeacherGroups(
    @User() user: UserEntity,
  ): Promise<StudentGroupResponse[]> {
    const groups = await this.studentGroupService.getAllTeacherGroups(user);
    return plainToClass(StudentGroupResponse, groups);
  }

  @Post('create')
  @Role(UserRole.TEACHER)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async createGroup(
    @User() user: UserEntity,
    @Body() data: CreateGroupPayload,
  ): Promise<StudentGroupResponse> {
    const group = await this.studentGroupService.createGroup(data, user);
    return plainToClass(StudentGroupResponse, group);
  }

  @Get(':groupId')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('groupId') groupId: string,
    @User() user: UserEntity,
  ): Promise<StudentGroupResponse> {
    const group = await this.studentGroupService.getById(groupId, user);
    return plainToClass(StudentGroupResponse, group);
  }
}
