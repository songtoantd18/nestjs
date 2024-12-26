import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  // Lấy tất cả người dùng
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
 
  // Phương thức cập nhật user
  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }


  // Tạo người dùng mới
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel({ ...createUserDto });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        // Lỗi duplicate key
        throw new ConflictException('Username đã tồn tại.');
      }
      throw new InternalServerErrorException('Đã xảy ra lỗi.');
    }
  }
  // Lấy người dùng theo ID
  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  // Xóa người dùng theo ID
  async deleteUser(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
