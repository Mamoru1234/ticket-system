import { Module } from '@nestjs/common';
import { MAIL_PROVIDER_TOKEN } from './provider/mail-provider.interface';
import { ConfigService } from '@nestjs/config';
import { ConsoleMailProviderService } from './provider/console-mail-provider.service';
import { MailJetMailProviderService } from './provider/mail-jet-mail-provider.service';

export enum MailProviderType {
  CONSOLE = 'console',
  MAIL_JET = 'mail-jet',
}

@Module({
  providers: [
    {
      provide: MAIL_PROVIDER_TOKEN,
      useFactory: (configService: ConfigService) => {
        const mailProviderType = configService.get('MAIL_PROVIDER_TYPE');
        if (mailProviderType === MailProviderType.CONSOLE) {
          return new ConsoleMailProviderService();
        }
        if (mailProviderType === MailProviderType.MAIL_JET) {
          return new MailJetMailProviderService(configService);
        }
        throw new Error(`Unknown Mail provider: ${mailProviderType}`);
      },
      inject: [ConfigService],
    }
  ],
  exports: [MAIL_PROVIDER_TOKEN],
})
export class MailModule {
}
