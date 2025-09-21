import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  console.log('🚀 ~ bootstrap ~ app:11111111111111111111111111', app);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
1;
