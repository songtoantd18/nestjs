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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { request } from 'http';
import { CurrentUser } from './decorate/user.decorator';
import { RoleGuard } from './guards/role.auth';
import { User } from './user.entity';
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(
    private readonly UserService: UserService,

    private readonly AuthService: AuthService,
  ) {}

  @Post('')
  createUser(@Body() requestBody: CreateUserDto) {
    console.log('🚀 ~ UserController ~ createUser ~ requestBody:', requestBody);
    console.log('đây là usercontroller2');
    return this.UserService.createUser(requestBody);
  }
  @Get('/curent-user')
  // @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser) {
    return currentUser;
  }

  @Get('')
  // @UseGuards(new RoleGuard(['admin', 'user']))
  // @UseGuards(AuthGuard)
  getAllUser() {
    console.log('đây là getAllUser');
    return this.UserService.findAll();
  }
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    console.log('🚀 ~ UserController ~ getUserById ~ id:', id);
    return this.UserService.findById(id);
  }
  @Put('/:id')
  @UseGuards(new RoleGuard(['admin', 'user', 'moderator']))
  @UseGuards(AuthGuard)
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    console.log(typeof id);
    console.log(typeof requestBody);
    return this.UserService.updateById(id, requestBody, currentUser);
  }
  @Delete('/:id')
  @UseGuards(new RoleGuard(['admin', 'user', 'moderator']))
  // @UseGuards(AuthGuard)
  deleteUserById(@Param('id') id: number) {
    console.log('🚀 ~ UserController ~ deleteUserById ~ id:', id);
    return this.UserService.deleteById(id);
  }
  @Post('/register')
  registerUser(@Body() requestBody: RegisterUserDto) {
    console.log('đây là usercontroller2221');
    return this.AuthService.register(requestBody);
  }
  @Post('/login')
  loginUser(@Body() requestBody: LoginUserDto) {
    console.log('đây là usercontroller2221');
    return this.AuthService.login(requestBody);
  }
}
