import { UserRole } from '../../../constants/user-role.enum';
import { IsDefined, IsEnum, IsString } from 'class-validator';

export class CreateUserPayload {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDefined()
  @IsEnum(UserRole)
  role: UserRole;
}
