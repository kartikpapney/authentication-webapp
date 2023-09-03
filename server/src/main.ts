import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    methods: '*',
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
  }),)
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
