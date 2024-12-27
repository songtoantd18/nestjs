import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserModule } from './user/user.module';  
import { UserModule } from './user/user.module';  // Module quản lý tài nguyên User (nếu có)

@Module({
  imports: [
    // Kết nối MongoDB sử dụng chuỗi kết nối bạn cung cấp
    MongooseModule.forRoot('mongodb+srv://songtoantd18crud:123@cluster0.d0ltp.mongodb.net/loginToken?retryWrites=true&w=majority'),
    UserModule,  // Module quản lý tài nguyên User (nếu có)
  ],
  controllers: [], 
  providers: [],
})
export class AppModule {}
