import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4000', // Cổng của frontend
    methods: 'GET, POST, PATCH, DELETE', // Các phương thức HTTP được phép
  });
  await app.listen(3000); // Cổng backend
}
bootstrap();
