import { IsDefined, IsEmail, IsNumber } from 'class-validator';

export class ActivateUserPayload {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsEmail()
  email: string;
}
