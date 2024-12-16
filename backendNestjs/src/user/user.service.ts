import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';  // Đảm bảo import đúng

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Lấy danh sách tất cả user
  async getAllUsers(): Promise<User[]> {
    console.log('Step 2: Truy vấn dữ liệu từ MongoDB');
    return this.userModel.find().exec();
  }

  // Tạo mới user
  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // Xóa user theo ID
  async deleteUser(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
