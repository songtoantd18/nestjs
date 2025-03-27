import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Bật CORS ở đây
  app.enableCors({
    origin: 'http://localhost:8080', // Gốc của frontend Vue
    credentials: true, // Cho phép gửi cookie (nếu cần)
  });

  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
