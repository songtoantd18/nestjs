import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  @Get('')
  getAllUser() {
    return this.UserService.findAll();
  }
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    console.log('🚀 ~ UserController ~ getUserById ~ id:', id);
    return this.UserService.findById(id);
  }
  @Put('/:id')
  updateUserById(@Param('id') id: number, @Body() requestBody: any) {
    console.log('🚀 ~ UserController ~ updateUserById ~ id:', id);
    console.log(
      '🚀 ~ UserController ~ updateUserById ~ requestBody:',
      requestBody,
    );
    return this.UserService.updateById(id, requestBody);
  }
  @Delete('/:id')
  deleteUserById(@Param('id') id: number) {
    console.log('🚀 ~ UserController ~ deleteUserById ~ id:', id);
    return this.UserService.deleteById(id);
  }
}
