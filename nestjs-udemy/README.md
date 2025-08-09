link github https://github.com/mguay22/sleepr
nestjs học được ở udemy thắng https://www.udemy.com/course/nestjs-microservices-build-deploy-a-scaleable-backend/learn/lecture/37156522#overview
bài 8 : cài mongoose
Hướng dẫn từng bước (có chú thích Làm gì — Vì sao — Nếu không làm) — Thiết lập common library: Config module + Database (Mongoose) module trong NestJS
Mình tóm gọn thành 10 bước — mỗi bước có ví dụ lệnh / code nhỏ, giải thích tại sao cần và hậu quả nếu bỏ qua.

Bước 1 — Cài đặt dependency
Làm gì

bash
Sao chép
Chỉnh sửa

# trong root dự án (hoặc trong thư mục workspace của library nếu dùng monorepo)

npm install @nestjs/mongoose mongoose @nestjs/config dotenv joi

# hoặc yarn add @nestjs/mongoose mongoose @nestjs/config dotenv joi

Vì sao

@nestjs/mongoose + mongoose cho kết nối Mongo.

@nestjs/config + dotenv để load biến môi trường .env.

joi dùng để validate biến môi trường (bảo đảm app không chạy khi thiếu config quan trọng).

Nếu không làm

Không có driver/adapter => không thể kết nối DB.

Không load .env => cần hardcode config (không linh hoạt).

Không validate => app có thể chạy nhưng crash khi connect do thiếu URI hoặc sai cấu hình.

Bước 2 — Tạo common library + modules (dùng Nest CLI)
Làm gì

bash
Sao chép
Chỉnh sửa

# ví dụ với Nest monorepo / workspace (nếu cấu trúc project như bạn mô tả)

nest generate library common
nest generate module database --project=common
nest generate module config --project=common
Vì sao

Tập trung các chức năng chung (config, db, helper) vào library dùng chung cho nhiều microservice.

Giữ tính độc lập: mỗi microservice import chính xác module cần (không bắt buộc bật mọi thứ global).

Nếu không làm

Mã lặp trong mỗi service, khó maintain.

Dễ gây dependency coupling giữa các service.

Bước 3 — Viết wrapper cho ConfigModule (trừu tượng hóa)
Làm gì (libs/common/config/config.module.ts)

## Bước 3 — Viết wrapper cho ConfigModule (trừu tượng hóa)

**File:** `libs/common/config/config.module.ts`

```ts
import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(), // biến phải tồn tại
      }),
      isGlobal: true, // để không phải import lại ở mỗi module
    }),
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
```
