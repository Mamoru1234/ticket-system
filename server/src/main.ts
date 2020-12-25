import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MAIL_PROVIDER_TOKEN, MailProvider } from './modules/mail/provider/mail-provider.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const mailService = app.get<MailProvider>(MAIL_PROVIDER_TOKEN);
  await mailService.sendMail({
    targetEmail: 'oleksiy_gontar@iownit.us',
    html: '<h1>Sample email</h1>',
    subject: 'Test send',
  })
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors();
  }
  await app.listen(3000);
}

bootstrap().catch((e) => {
  console.log('Error in bootstrap: ', e);
});
