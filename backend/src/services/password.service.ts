import { Service } from 'typedi';
import { createHmac } from 'crypto';
import { APP_PASS_SECRET } from '../config';

@Service()
export class PasswordService {
  createPassword(password: string): string {
    const hash = createHmac('sha512', APP_PASS_SECRET);
    hash.update(password);
    return hash.digest().toString('base64');
  }

  comparePassword(password: string, hash: string): boolean {
    const checkHash = this.createPassword(password);
    return checkHash === hash;
  }
}
