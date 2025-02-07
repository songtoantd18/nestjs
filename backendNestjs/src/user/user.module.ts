import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,

      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, AuthService, JwtService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
