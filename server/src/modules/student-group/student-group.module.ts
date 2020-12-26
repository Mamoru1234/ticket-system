import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { StudentGroupController } from './student-group.controller';
import { StudentGroupService } from './student-group.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [StudentGroupController],
  providers: [StudentGroupService],
})
export class StudentGroupModule {

}
