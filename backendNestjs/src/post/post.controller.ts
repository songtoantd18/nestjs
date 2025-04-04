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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { CurrentUser } from 'src/user/decorate/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { User } from 'src/user/user.entity';
import { UpdatePostDto } from './dto/updatePost.dto';
import { SelectPostDto } from './dto/select-post.dto';

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
  /////////////////////////////
  @Get('/select')
  @UseGuards(AuthGuard)
  async selectPost(@Query() dto: SelectPostDto) {
    return this.postService.selectPosts(dto);
  }

  @Get('/all')
  findAllPosts() {
    console.log('đây là find all posts');
    return this.postService.getAllPosts();
  }
  @Get('/:id')
  findPostById(@Param('id', ParseIntPipe) id: number) {
    console.log('🚀 ~ PostController ~ findPostById ~ id:', id);
    return this.postService.getPostById(id);
  }
  @Get('/allposts/:id')
  findAllPostsById(@Param('id', ParseIntPipe) id: number) {
    console.log('đây là find all posts byid');
    return this.postService.getAllPostsByUserId(id);
  }

  ////////////////////////////////////////

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
    return this.postService.deletePost(id, currentUser);
  }
}
