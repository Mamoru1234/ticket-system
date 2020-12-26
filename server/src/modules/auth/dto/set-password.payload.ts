import { IsDefined, IsJWT, IsString, MinLength } from 'class-validator';

export class SetPasswordPayload {
  @IsDefined()
  @IsJWT()
  token: string;

  @IsDefined()
  @IsString()
  @MinLength(5)
  password: string;
}
