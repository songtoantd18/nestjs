import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post]), UserModule],

  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
