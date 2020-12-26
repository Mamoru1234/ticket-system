import { EmailSendOptions } from '../../mail/provider/mail-provider.interface';
import { UserEntity } from '../../database/entity/user.entity';

export const forgotPasswordMail = (user: UserEntity, resetLink: string): EmailSendOptions => ({
  subject: 'Forgot password',
  targetEmail: user.email,
  html: `
<div>
  <div>Your account password restore</div>
  <div><a href="${resetLink}">Set password</a></div>
</div>
  `
});
