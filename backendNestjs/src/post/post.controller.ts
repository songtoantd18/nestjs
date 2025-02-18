import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { CurrentUser } from 'src/user/decorate/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { User } from 'src/user/user.entity';
import { UpdatePostDto } from './dto/updatePost.dto';

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
  @Get('/all')
  findAllPosts() {
    return this.postService.getAllPosts();
  }
  @Get('/:id')
  findPostById(@Param('id', ParseIntPipe) id: number) {
    console.log('🚀 ~ PostController ~ findPostById ~ id:', id);
    return this.postService.getPostById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  // chỉ có admin và người sở hữu mới có thể update
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdatePostDto,
    @CurrentUser() currentUser: User,
  ) {
    console.log('🚀 ~ PostController ~ currentUser:', currentUser);
    console.log('🚀 ~ PostController ~ requestBody:', requestBody);
    console.log('🚀 ~ PostController ~ id:', id);
    return this.postService.updatePost(id, requestBody, currentUser);
  }
  @Delete('/:id')
  @UseGuards(AuthGuard)
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    return this.postService.deletePost(id,currentUser);
  }
}
