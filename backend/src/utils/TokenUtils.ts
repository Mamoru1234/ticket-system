import { sign, SignOptions, verify } from 'jsonwebtoken';
import { APP_TOKEN_SECRET } from '../config';
import { TokenData } from '../constants/token-data.type';

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  algorithm: 'HS512',
  expiresIn: '30m',
};

export class TokenUtils {
  static sign(data: any, options?: SignOptions): Promise<string> {
    const _options: SignOptions = options
      ? options
      : DEFAULT_SIGN_OPTIONS;
    return new Promise<string>((res, rej) => {
      sign(data, APP_TOKEN_SECRET, _options, (err, token) => {
        if (err) {
          rej(err);
          return;
        }
        if (!token) {
          rej(new Error('Token not generated'));
          return;
        }
        res(token);
      });
    })
  }

  static verify(token: string): Promise<TokenData> {
    return new Promise<TokenData>((res, rej) => {
      verify(token, APP_TOKEN_SECRET, {
        algorithms: ['HS512'],
      }, (err, decoded) => {
        if (err) {
          rej(err);
          return;
        }
        if (!decoded) {
          rej(new Error('Token not decoded'));
          return;
        }
        res(decoded as any);
      });
    });
  }
}
