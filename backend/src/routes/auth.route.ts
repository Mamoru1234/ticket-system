import express, { Router, Request, Response } from 'express';
import { asyncHandler, validateBody } from '../utils/RouterUtils';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Service } from 'typedi';
import { UserDao } from '../models/dao/user.dao';
import { DatabaseService } from '../services/database.service';
import { AuthError } from '../errors/auth.error';
import { PasswordService } from '../services/password.service';
import { TokenData } from '../constants/token-data.type';
import { TokenUtils } from '../utils/TokenUtils';

export class LoginBody {
  @IsString()
  @IsEmail()
  email!: string;
  @IsString()
  @MinLength(5)
  password!: string;
}

@Service()
export class AuthRoute {
  constructor(
    private readonly userDao: UserDao,
    private readonly dbService: DatabaseService,
    private readonly passwordService: PasswordService,
  ) {
  }
  init(): Router {
    const router = Router();
    router.post('/login', [express.json(), validateBody(LoginBody), asyncHandler(this.login.bind(this))]);
    return router;
  }

  async login(req: Request, res: Response): Promise<void> {
    const body: LoginBody = req.body;
    const user = await this.dbService.runInTx(txn => {
      return this.userDao.findOne(txn, {
        where: {
          email: body.email,
        },
      });
    });
    if (!user) {
      throw new AuthError('email or password wrong');
    }
    if (!user.password) {
      throw new AuthError('Cannot login with password');
    }
    const isValid = this.passwordService.comparePassword(body.password, user.password);
    if (!isValid) {
      throw new AuthError('email or password wrong');
    }
    const tokenData: TokenData = {
      email: user.email,
    };
    const token = await TokenUtils.sign(tokenData);
    res.json({
      token: token,
    });
  }
}
