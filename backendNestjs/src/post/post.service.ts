import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Not, Repository, DataSource } from 'typeorm';
import { get, request } from 'http';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/user/user.entity';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Permission } from 'src/helper/checkPermission.helper';
import { SelectPostDto } from './dto/select-post.dto';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private dataSource: DataSource,
  ) {}
  createPost(requestBody: CreatePostDto, currentUser: User) {
    console.log('đây là postservice');
    const post = this.postsRepository.create(requestBody);
    post.user = currentUser;
    return this.postsRepository.save(post);
  }
  async getAllPosts() {
    console.log('đây là get all posts');
    const posts = await this.postsRepository.find({
      relations: ['user'], // Lấy mối quan hệ với bảng User
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      created_at: post.created_at,
      updated_at: post.updated_at,
      userId: post.user.id, // Thay vì trả về toàn bộ thông tin user, chỉ lấy userId
    }));
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
  async getAllPostsByUserId(userId: number) {
    console.log('đây là get all posts by user id ở post service');
    const posts = await this.postsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'], // nếu bạn cần thông tin user đi kèm
    });
    console.log('🚀 ~ PostService ~ getAllPostsByUserId ~ posts:', posts);

    if (!posts || posts.length === 0) {
      throw new NotFoundException(`No posts found for user with id ${userId}`);
    }

    return posts;
  }

  async selectPosts(dto: SelectPostDto) {
    let { conditions, columns } = dto;

    // Parse columns nếu là string
    if (typeof columns === 'string') {
      try {
        columns = JSON.parse(columns);
      } catch (e) {
        throw new BadRequestException('columns phải là một mảng JSON');
      }
    }

    // Tương tự với conditions
    const whereObj = conditions ? JSON.parse(conditions) : {};

    const columnStr = columns && columns.length > 0 ? columns.join(', ') : '*';

    const qb = this.dataSource
      .createQueryBuilder()
      .select(columnStr)
      .from(Post, 'post');

    Object.entries(whereObj).forEach(([key, value], index) => {
      qb.andWhere(`post.${key} = :value${index}`, { [`value${index}`]: value });
    });

    return qb.getRawMany();
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
