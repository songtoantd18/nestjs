import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule, // Module quản lý user
    LoggerModule, // Module log dùng chung trong hệ thống

    // 🔧 Cấu hình module config (đọc biến môi trường từ .env)
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép ConfigModule được dùng toàn cục
      envFilePath: 'apps/auth/.env', // Chỉ rõ đường dẫn tới file .env cho service auth

      // ✅ Xác thực biến môi trường bằng Joi
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(), // bắt buộc phải có chuỗi MONGODB_URI
        JWT_SECRET: Joi.string().required(), // bắt buộc phải có chuỗi JWT_SECRET
        JWT_EXPIRATION: Joi.string().required(), // bắt buộc phải có JWT_EXPIRATION
        PORT: Joi.number().required(), // bắt buộc phải có PORT kiểu number
      }),
    }),

    // 🔑 Cấu hình JWT module (dùng cho xác thực)
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiration = configService.get<string>('JWT_EXPIRATION');

        // 👇 Log để kiểm tra giá trị load từ .env
        console.log('✅ JWT_SECRET:----------------', secret);
        console.log('✅ JWT_EXPIRATION-----------------------:', expiration);

        return {
          secret,
          signOptions: {
            expiresIn: `${expiration}s`,
          },
        };
      },
      inject: [ConfigService], // inject ConfigService để sử dụng trong useFactory
    }),
  ],

  controllers: [AuthController], // Controller xử lý request liên quan đến auth
  providers: [AuthService, LocalStrategy], // Service xử lý logic liên quan đến auth
})
export class AuthModule {}
