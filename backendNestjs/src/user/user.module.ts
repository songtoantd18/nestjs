import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { AnotherMiddleware } from 'src/middleware/another.middleware';




@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Đảm bảo đăng ký schema với module
  ],
  controllers: [UserController],  // Đảm bảo controller được đăng ký
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users'); 
    consumer.apply(AnotherMiddleware).forRoutes('users');
    // 
    //  // Sử dụng middleware cho tất cả các route trong users
  }
}
