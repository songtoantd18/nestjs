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

Bài 9: Abstract Repository (NestJS + Mongoose)

1️⃣ Mục tiêu: hiểu 1 cách đơn giản là làm 1 cái crud abtract sau đó tất cả các crud khác kế thừa cái này chỉ thay đổi schema là nơi lưu trữ thooui ví dụ user thì dùng User còn customer thì dùng Customer
Tạo lớp repository chung (AbstractRepository) để xử lý các thao tác CRUD cơ bản.

Tất cả repository khác (UserRepository, OrderRepository…) sẽ kế thừa để tái sử dụng code.

Đảm bảo type safety và dễ bảo trì.

2️⃣ AbstractDocument – Schema cơ sở
Mọi document trong MongoDB đều có \_id duy nhất.
Chúng ta tạo AbstractDocument để mọi schema kế thừa và tự động có \_id.

````ts

import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import \* as mongoose from 'mongoose';

/\*\*

- AbstractDocument
- ***
- Schema cơ sở cho tất cả MongoDB documents.
- Các entity kế thừa sẽ tự động có trường `_id` chuẩn ObjectId.
  \*/
  @Schema()
  export abstract class AbstractDocument {
  /\*\*
  - \_id: ObjectId của MongoDB
  - - Dùng `@Prop()` để khai báo với Mongoose.
  - - `Types.ObjectId` đảm bảo type-safe khi code.
      \*/
      @Prop({ type: mongoose.Schema.Types.ObjectId })
      \_id: Types.ObjectId;
      }
      3️⃣ AbstractRepository – CRUD dùng chung
      Đây là lớp generic abstract class chứa các method CRUD cơ bản.

```ts

import { NotFoundException, Logger } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

/**
 * AbstractRepository
 * ------------------
 * Base repository chứa CRUD dùng chung cho tất cả entity.
 */
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * Create document mới
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as TDocument;
  }

  /**
   * Tìm một document
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  /**
   * Tìm nhiều document
   */
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  /**
   * Tìm và cập nhật document
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);

    if (!updatedDocument) {
      this.logger.warn('Document to update not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return updatedDocument;
  }

  /**
   * Tìm và xóa document
   */
  async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const deletedDocument = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!deletedDocument) {
      this.logger.warn('Document to delete not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return deletedDocument;
  }
}
4️⃣ Ví dụ: UserRepository kế thừa

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../common/database/repositories/abstract.repository';
import { UserDocument, User } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
➡ Giờ UserRepository tự động có create, findOne, find, findOneAndUpdate, findOneAndDelete mà không cần viết lại.

5️⃣ Cấu trúc thư mục
pgsql
Sao chép
Chỉnh sửa
src
├── common
│   └── database
│       ├── repositories
│       │   └── abstract.repository.ts
│       ├── schemas
│       │   └── abstract.schema.ts
│       └── database.module.ts
├── users
│   ├── repositories
│   │   └── user.repository.ts
│   ├── schemas
│   │   └── user.schema.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── users.module.ts
└── app.module.ts
6️⃣ Ưu điểm OOP áp dụng
Kế thừa (Inheritance): Repository con kế thừa CRUD từ AbstractRepository.

Tái sử dụng (Reusability): Viết 1 lần, dùng cho nhiều entity.

Đa hình (Polymorphism): Có thể ghi đè (override) method CRUD nếu muốn logic riêng.

Bạn có muốn mình thêm sơ đồ UML minh họa mối quan hệ giữa AbstractDocument → AbstractRepository → UserRepository để README nhìn trực quan hơn không?
Mình vẽ thì nhìn phát hiểu ngay.
````

bài 10 : đang gặp khó khăn ở chỗ import các file , k hiểu đang thiếu file nào ở đâu import là đúng loạn xạ , giải thích chỗ kế thừa ở đây là reservationResponsitory ekes thauwf abstracResponsitory sau đó sử dụng cách method của abstractResponsitory

/\*\*

bài 14 :
Tóm tắt các bước trong đoạn bạn đưa:

Tạo microservice Auth

Dùng Nest CLI: nest generate app auth.

NestJS tự tạo thư mục auth, cập nhật tsconfig, package.json, nest-cli.json.

Tạo module và controller cho User

CLI: nest generate module users --project=auth.

CLI: nest generate controller users --project=auth.

Kết quả: UsersModule và UsersController.

Tạo DTO (Data Transfer Object)

Thư mục users/dto/create-user.dto.ts.

Gồm email: string (decorator @IsEmail()) và password: string (decorator @IsStrongPassword()).

Tạo Service cho User

CLI: nest generate service users --project=auth.

Trong UsersController, inject UsersService và gọi create().

Trong UsersService, tạo hàm create(dto).

Tạo Repository & Schema cho User (MongoDB + Mongoose)

File user.repository.ts: kế thừa AbstractRepository.

File models/user.schema.ts: định nghĩa UserSchema với email, password.

Kết nối với DatabaseModule.

Cấu hình UsersModule

Import DatabaseModule.

Đăng ký schema: UserSchema.

Thêm UserRepository vào providers.

Dockerize Auth Service

Tạo Dockerfile trong apps/auth/.

Cập nhật docker-compose.yml: thêm service auth, chạy ở cổng 3001.

Trong main.ts của auth, đổi app.listen(3001).

Test API tạo user bằng Postman

Endpoint: POST http://localhost:3001/users.

Body: { "email": "test@example.com", "password": "StrongPass123!" }.

Thành công: trả về 201 Created.

Thêm Validation & Logger

Trong main.ts: cấu hình ValidationPipe (class-validator).

Import LoggerModule (pino logger).

Test lại: thiếu email hoặc password → báo lỗi validation.

Chuẩn bị bước tiếp theo: JWT Authentication

Đã có: tạo user.

Sắp làm: login và sinh JWT để dùng trong các microservice khác.

chỗ này cần chú ý dto là bộ lọc đối với client , schema là đồi với db có nghĩa

| Tiêu chí                               | DTO                            | Schema                                                   |
| -------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| Vai trò                                | Bộ lọc dữ liệu từ client       | Định nghĩa dữ liệu trong DB                              |
| Thời điểm áp dụng                      | Lúc request từ client → server | Lúc lưu/đọc dữ liệu trong DB                             |
| Có bắt buộc client phải gửi?           | Có (theo validate trong DTO)   | Không (có thể auto tạo default)                          |
| Thêm field ngoài client có thấy không? | Không (bị loại bỏ)             | Có (nếu Schema định nghĩa default hoặc service thêm vào) |

note : lúc này có 2 module là auth và reservations thì reservation đang ở cổng 3000 bây giờ muốn thao tác với auth /user thì phải chuyển qua cổng 3001 vì 2 cái là riêng biệt chứ k có chung như cấu trúc sau
nestjs-udemy/
├─ apps/
│ ├─ auth/ # app xử lý auth
│ └─ reservations/ # app xử lý đặt chỗ
├─ libs/ # các thư viện dùng chung (DTO, util, guards, pipes...)
├─ node_modules/
├─ package.json
├─ nest-cli.json # config để Nest biết apps nằm trong /apps
Trong NestJS monorepo, mỗi app (auth, reservations, …) đều là một ứng dụng NestJS độc lập, nên nếu muốn chạy cùng lúc thì:

🔹 Nguyên tắc

Mỗi app phải nghe (listen) trên một cổng khác nhau.

Ví dụ:

auth → chạy ở port 3000

reservations → chạy ở port 3001

🔹 Cách cấu hình port

Trong apps/auth/src/main.ts:

async function bootstrap() {
const app = await NestFactory.create(AppModule);
await app.listen(3000); // ✅ Auth app chạy ở cổng 3000
}
bootstrap();

Trong apps/reservations/src/main.ts:

async function bootstrap() {
const app = await NestFactory.create(AppModule);
await app.listen(3001); // ✅ Reservations app chạy ở cổng 3001
}
bootstrap();

🔹 Cách chạy

Mở 2 terminal khác nhau:

npm run start:dev auth

và

npm run start:dev reservations

→ lúc này bạn sẽ có 2 server NestJS chạy đồng thời, mỗi server phục vụ 1 app.
thêm loggermodule vào
\*/
