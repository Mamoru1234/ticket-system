import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { StudentGroupModule } from './modules/student-group/student-group.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { TicketModule } from './modules/ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    UserModule,
    StudentGroupModule,
    LessonModule,
    TicketModule,
  ],
})
export class AppModule {}
