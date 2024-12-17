import { Controller, Get, Post,Put, Body, Delete, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { isValidObjectId } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Lấy danh sách tất cả users
  @Get()
  async getAll() {
    console.log('Step 1: Nhận request tại Controller - /users');
    return this.userService.getAllUsers();
  }

  // Tạo mới user
  @Post()
  async create(@Body() user: User) {
    return this.userService.createUser(user);
  }

  // Lấy user theo ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
// Cập nhật thông tin user theo ID
  @Put(':id')
async update(@Param('id') id: string, @Body() user: User) {
  if (!isValidObjectId(id)) {
    throw new BadRequestException('ID không hợp lệ');
  }
  return this.userService.updateUser(id, user);
}
  // Xóa user theo ID
  @Delete('delete')
  async delete(@Body() body: { id: string }) {
    if (!isValidObjectId(body.id)) {
      throw new BadRequestException('ID không hợp lệ');
    }
    return this.userService.deleteUser(body.id);
  }
}
