import { IsDefined, IsEmail, IsString } from 'class-validator';

export class ForgotPasswordPayload {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;
}
