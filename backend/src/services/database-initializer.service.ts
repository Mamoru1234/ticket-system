import { UserService } from './user.service';
import { Service } from 'typedi';
import { UserRole } from '../constants/user-role.enum';

@Service()
export class DatabaseInitializerService {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  async init(): Promise<void> {
    await this.userService.registerUser({
      password: 'admin',
      firstName: 'Oleksiy',
      lastName: 'Gontar',
      role: UserRole.ADMIN,
      login: 'admin',
    });
  }
}
