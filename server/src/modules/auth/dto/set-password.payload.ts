import { IsDefined, IsString, MinLength } from 'class-validator';

export class SetPasswordPayload {
  @IsDefined()
  @IsString()
  token: string;

  @IsDefined()
  @IsString()
  @MinLength(5)
  password: string;
}
