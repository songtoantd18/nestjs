import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Đảm bảo đăng ký schema với module
  ],
  controllers: [UserController],  // Đảm bảo controller được đăng ký
  providers: [UserService],
})
export class UserModule {}
