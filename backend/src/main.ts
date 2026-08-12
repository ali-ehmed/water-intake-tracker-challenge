import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000', // allow frontend dev server
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true, // optional
  });

  await app.listen(3001);
}
bootstrap();
