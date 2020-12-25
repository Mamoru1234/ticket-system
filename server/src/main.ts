import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors();
  }
  await app.listen(3000);
}

bootstrap().catch((e) => {
  console.log('Error in bootstrap: ', e);
});
