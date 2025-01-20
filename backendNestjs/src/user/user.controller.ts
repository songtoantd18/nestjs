import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('')
  createUser(@Body() requestBody: any) {
    console.log('🚀 ~ UserController ~ createUser ~ requestBody:', requestBody);
    console.log('đây là usercontroller2');
    return this.UserService.createUser(requestBody);
  }
  @Get('/test')
  sayhi() {
    return 'hello word';
  }
}
