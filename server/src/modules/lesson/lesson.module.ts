import { Module } from '@nestjs/common';
import { StudentGroupModule } from '../student-group/student-group.module';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [StudentGroupModule, AuthModule, DatabaseModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {

}
