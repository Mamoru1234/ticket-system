import { Expose } from 'class-transformer/decorators';
import { UserRole } from '../../../constants/user-role.enum';

export class UserResponse {
  @Expose()
  id!: number;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  role!: UserRole;

  @Expose()
  email!: string;
}
