import { Controller, Get, Post, Put, Body, Delete, Param, BadRequestException, UseGuards, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
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
    console.log("🚀 ~ UserController ~ getAll ~ dataValue:", dataValue)
    return dataValue;
  }

  // Create a new user
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('method create() in user.controller.ts');
    return this.userService.createUser(createUserDto);
  }

  // Get user by ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    console.log("🚀 ~ UserController ~ getById ~ id:", id)
    return this.userService.getUserById(id);
  }

  // Update user by ID
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    console.log("🚀 ~ UserController ~ update ~ id:", id)
    if (isNaN(Number(id))) {
      console.log("🚀 ~ UserController ~ update ~ id:", typeof id)
      throw new BadRequestException('Invalid ID');
    }
    return this.userService.updateUser(id, user);
  }

  // Delete user by ID
  @Delete('delete')
  async delete(@Body() body: { id: string }) {
    if (isNaN(Number(body.id))) {
      throw new BadRequestException('Invalid ID');
    }
    return this.userService.deleteUser(body.id);
  }
}
