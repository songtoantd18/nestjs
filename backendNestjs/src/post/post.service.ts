import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { request } from 'http';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  createPost(requestBody: CreatePostDto, currentUser: User) {
    console.log('đây là postservice');
    const post = this.postsRepository.create(requestBody);
    post.user = currentUser;
    return this.postsRepository.save(post);
  }
}
