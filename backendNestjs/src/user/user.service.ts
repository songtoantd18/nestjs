import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  // Lấy tất cả người dùng
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
 
  // Phương thức cập nhật user
  async updateUser(id: string, user: User) {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }


  // Tạo người dùng mới
  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
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
