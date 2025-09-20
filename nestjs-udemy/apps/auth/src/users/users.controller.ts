import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('📥 [Controller] DTO nhận được:', createUserDto);
    return this.usersService.create(createUserDto);
  }
  @Get()
  async findAllUser() {
    return this.usersService.findAll();
  }
}
