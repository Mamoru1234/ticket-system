import { connect, Email } from 'node-mailjet';
import { EmailSendOptions, MailProvider } from './mail-provider.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailJetMailProviderService implements MailProvider {
  private readonly client: Email.Client;
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.client = connect(configService.get('MAIL_JET_API_KEY'), configService.get('MAIL_JET_API_SECRET'));
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
