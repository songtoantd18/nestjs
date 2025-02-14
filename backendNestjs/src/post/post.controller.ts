import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { CurrentUser } from 'src/user/decorate/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { User } from 'src/user/user.entity';

@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('')
  getPost() {
    return 'đây là post';
  }
  @Post('')
  @UseGuards(AuthGuard)
  createPost(
    @Body() requestBody: CreatePostDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.postService.createPost(requestBody, currentUser);
  }
}
