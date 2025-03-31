import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { Post } from './post/post.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('DB_HOST'));
        console.log(configService.get('DB_PORT'));
        console.log(configService.get('DB_USERNAME'));
        console.log(configService.get('DB_PASSWORD'));
        console.log(configService.get('DB_DATABASE'));

        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, Post, Comment],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),

    UserModule,

    PostModule,

    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
