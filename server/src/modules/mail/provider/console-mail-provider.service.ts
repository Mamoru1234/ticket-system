import { EmailSendOptions, MailProvider } from './mail-provider.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsoleMailProviderService implements MailProvider {
  async sendMail(options: EmailSendOptions): Promise<void> {
    console.log('Send mail: ');
    console.log('To: ', options.targetEmail);
    console.log('Subject: ', options.subject);
    console.log('Html: ', options.html);
  }
}
