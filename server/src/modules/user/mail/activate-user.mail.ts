import { UserEntity } from '../../database/entity/user.entity';
import { EmailSendOptions } from '../../mail/provider/mail-provider.interface';

export const activateUserMail = (user: UserEntity, resetLink: string): EmailSendOptions => ({
  targetEmail: user.email,
  subject: 'User activation',
  html: `
<div>
    <div>Your account activated</div>
    <div><a href="${resetLink}">Set password</a></div>
</div>
`,
});
