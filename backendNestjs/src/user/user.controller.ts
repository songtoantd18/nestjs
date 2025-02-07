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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUser.dto';
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
  @Get('')
  @UseGuards(AuthGuard)
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
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateUserDto,
  ) {
    console.log(typeof id);
    console.log(typeof requestBody);
    return this.UserService.updateById(id, requestBody);
  }
  @Delete('/:id')
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
