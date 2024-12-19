import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { TestController } from './test.controller';
import { TestServices } from './test.service';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Đảm bảo đăng ký schema với module
  ],
  controllers: [UserController,TestController],  // Đảm bảo controller được đăng ký
  providers: [UserService,TestServices],
})
export class UserModule {}
