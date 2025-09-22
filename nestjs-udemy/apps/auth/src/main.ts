import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

import { ValidationPipe } from '@nestjs/common';
// import { Logger } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // console.log('🚀 ~ bootstrap ~ app:11111111111111111111111111', app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  // Custom logger
  app.useLogger(app.get(Logger));
  // app.useLogger(new Logger());
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
