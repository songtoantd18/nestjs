import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    currentUser: User,
  ): Promise<CommentResponseDto> {
    const { content, postId } = createCommentDto;

    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) throw new Error('Post not found');

    const comment = this.commentRepository.create({
      content,
      post,
      user: currentUser,
    });
    const savedComment = await this.commentRepository.save(comment);
    const commentReturn = {
      content: savedComment.content,
      postId: savedComment.post.id, // Lấy id từ object post
      userId: savedComment.user.email, // Lấy id từ object user
    };
    return commentReturn;
  }

  async findAllByPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      select: {
        id: true,
        content: true,
        created_at: true,
        user: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
        post: {
          title: true,
        },
      },
      relations: ['user', 'post'],
      order: {
        created_at: 'DESC',
      },
    });
  }
}
