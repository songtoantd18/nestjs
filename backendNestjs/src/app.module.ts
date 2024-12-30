import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';  // Module quản lý tài nguyên User (nếu có)
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123123',
      database: 'datauser',
      entities: [UserEntity],
      synchronize: true,
      
    }),
    UserModule,  // Module quản lý tài nguyên User (nếu có)
  ],
  controllers: [], 
  providers: [],
})
export class AppModule {}
