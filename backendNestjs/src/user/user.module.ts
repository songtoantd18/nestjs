import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { AnotherMiddleware } from 'src/middleware/another.middleware';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
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
