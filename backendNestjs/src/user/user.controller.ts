import { Controller, Get, Post,Put, Body, Delete, Param, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { isValidObjectId } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationPipe,UsePipes } from '@nestjs/common';
import {CreateUserDto} from '../user/dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';

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
  @UsePipes(new ValidationPipe({ transform: true }))  // Pipe sẽ được sử dụng tại đây
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("🚀 ~ UserController ~ create ~ createUserDto:", createUserDto);
    return this.userService.createUser(createUserDto);  // Gửi dữ liệu vào service
  }
  

  // Lấy user theo ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    console.log("🚀 ~ UserController ~ getById ~ id: get user by id", id)
    return this.userService.getUserById(id);
  }
// Cập nhật thông tin user theo ID
@Put(':id')
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
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

