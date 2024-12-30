import { Controller, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID');
    }
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete')
  async delete(@Body() body: { id: string }) {
    if (isNaN(Number(body.id))) {
      throw new BadRequestException('Invalid ID');
    }
    try {
      await this.userService.deleteUser(body.id);
      throw new ConflictException('Xóa thành công');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('ID của bạn bị sai');
      }
      throw error;
    }
  }
}