import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
  }));
  app.setGlobalPrefix('/api/v1');
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors();
  }
  await app.listen(3000);
}

bootstrap().catch((e) => {
  console.log('Error in bootstrap: ', e);
});
