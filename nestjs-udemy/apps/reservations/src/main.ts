// import { NestFactory } from '@nestjs/core';
// import { ReservationsModule } from './reservations.module';

// async function bootstrap() {
//   const app = await NestFactory.create(ReservationsModule);
//   console.log('🚀 ~ bootstrap ~ app:22222222222222222222222222222222');
//   await app.listen(process.env.port ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AuthModule } from '../../auth/src/auth.module';
// D:\1.CONGVIEC\2.Learn\nestjs\nestjs-udemy\apps\auth\src\auth.module.ts
async function bootstrap() {
  console.log('🚀 ~ bootstrap ~ app:00000000000000000000000');

  const app = await NestFactory.create(AuthModule);
  console.log('🚀 ~ bootstrap ~ app:11111111111111111111111111');
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
1;
