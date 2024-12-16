import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Lấy danh sách tất cả users
  @Get()
  async getAll() {
    return this.userService.getAllUsers();
  }

  // Tạo mới user
  @Post()
  async create(@Body() user: User) {
    return this.userService.createUser(user);
  }

  // Xóa user theo ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
