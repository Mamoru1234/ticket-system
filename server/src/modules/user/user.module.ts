import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [AuthModule, DatabaseModule, MailModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}
