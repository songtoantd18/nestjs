import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Not, Repository } from 'typeorm';
import { get, request } from 'http';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/user/user.entity';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Permission } from 'src/helper/checkPermission.helper';
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
  getAllPosts() {
    console.log('đây là get all posts');
    return this.postsRepository.find();
  }
  async getPostById(id: number) {
    console.log(
      '🚀 ~11111111111111111111111 PostService ~ getPostById ~ id:',
      id,
    );
    let postById = await this.postsRepository.findOneBy({ id });
    console.log('🚀 ~ PostService ~ getPostById ~ postById:', postById);
    if (!postById) {
      throw new NotFoundException(`Post not found with this ${id}`);
    }
    return postById;
  }

  async updatePost(id: number, requestBody: UpdatePostDto, currentUser: User) {
    console.log(
      '🚀 ~ PostService ~ updatePost ~ id:--------------------------',
      id,
    );
    let postById = await this.getPostById(id);
    console.log(
      '🚀 ~ PostService ~ updatePost ~ postById:-------------------------',
      postById,
    );

    if (!postById) {
      throw new NotFoundException(`Post not found with this ${id}`);
    }

    postById = { ...postById, ...requestBody };
    Permission.checkPermission(postById.user.id, currentUser);
    // chỉnh ở đây lấy userid so sánh có được phép cấp quyền để edit chứ eneus k có thì ai cũng có thể xóa hay edit thì k được sai logic

    return this.postsRepository.save(postById);
  }
  async deletePost(id: number, currentUser: User) {
    let postById = await this.getPostById(id);
    if (!postById) {
      throw new NotFoundException(`Post not found with this ${id}`);
    }
    Permission.checkPermission(postById.user.id, currentUser);
    this.postsRepository.delete(postById.id);
    return {
      message: 'xóa bài post thành công',
      deletedPost: postById,
    };
  }
}
