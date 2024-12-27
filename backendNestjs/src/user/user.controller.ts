import { Controller, Get, Post, Put, Body, Delete, Param, BadRequestException, UseGuards, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { isValidObjectId } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptors';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)

export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users
  @Get()
  async getAll() {
    console.log('method getAll() in user.controller.ts');
    const dataValue = await this.userService.getAllUsers();
    return dataValue;
  }

  // Create a new user
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Get user by ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  // Update user by ID
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.userService.updateUser(id, user);
  }

  // Delete user by ID
  @Delete('delete')
  async delete(@Body() body: { id: string }) {
    if (!isValidObjectId(body.id)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.userService.deleteUser(body.id);
  }
}
