import { connect, Email } from 'node-mailjet';
import { EmailSendOptions, MailProvider } from './mail-provider.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailJetMailProviderService implements MailProvider {
  private readonly client: Email.Client;
  constructor() {
    this.client = connect('', '');
  }

  async sendMail(options: EmailSendOptions): Promise<void> {
    await this.client.post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'fgontar5@gmail.com',
            },
            To: [
              {
                Email: options.targetEmail,
              }
            ],
            Subject: options.subject,
            HTMLPart: options.html,
          },
        ],
      });
  }
}
