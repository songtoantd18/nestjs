import { Controller, Get, Post,Put, Body, Delete, Param, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { isValidObjectId } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Lấy danh sách tất cả users
  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    console.log('Step 1: Nhận request tại Controller - /users');
     var dataValue = await this.userService.getAllUsers();
     console.log("🚀 ~ UserController ~ getAll ~ dataValue:----------", dataValue)
    return dataValue
  }


  // Tạo mới user
  @Post()
  async create(@Body() user: User) {
    console.log("🚀 ~ UserController ~ create ~ user: đây là tạo create new user", user)
    return this.userService.createUser(user);
  }

  // Lấy user theo ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    console.log("🚀 ~ UserController ~ getById ~ id: get user by id", id)
    return this.userService.getUserById(id);
  }
// Cập nhật thông tin user theo ID
  @Put(':id')
async update(@Param('id') id: string, @Body() user: User) {
  console.log("🚀 ~ UserController ~ update ~ user: change data", user)
  console.log("🚀 ~ UserController ~ update ~ id:", id)
  if (!isValidObjectId(id)) {
    throw new BadRequestException('ID không hợp lệ');
  }
  return this.userService.updateUser(id, user);
}
  // Xóa user theo ID
  @Delete('delete')
  async delete(@Body() body: { id: string }) {
    console.log("🚀 ~ UserController ~ delete ~ id: delete dữ liệu", body.id)
    if (!isValidObjectId(body.id)) {
      throw new BadRequestException('ID không hợp lệ');
    }
    return this.userService.deleteUser(body.id);
  }
}

