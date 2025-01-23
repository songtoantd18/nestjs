import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
