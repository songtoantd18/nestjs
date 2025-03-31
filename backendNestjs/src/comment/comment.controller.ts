import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../user/decorate/user.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '../user/guards/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() currentUser: User,
  ) {
    console.log('đây là commentcontroller');
    console.log(currentUser);
    console.log(createCommentDto);

    return this.commentService.createComment(createCommentDto, currentUser);
  }

  @Get('post/:postId')
  findAllByPost(@Param('postId') postId: number) {
    return this.commentService.findAllByPost(postId);
  }
}
