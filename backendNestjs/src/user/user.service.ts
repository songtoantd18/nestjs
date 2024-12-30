import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Lấy tất cả người dùng
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Đã xảy ra lỗi khi lấy danh sách người dùng.');
    }
  }

  // Lấy người dùng theo ID
  async getUserById(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Đã xảy ra lỗi.');
    }
  }

  // Tạo người dùng mới
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error creating user:', error); // Log chi tiết lỗi

      // Kiểm tra mã lỗi cho các cơ sở dữ liệu khác nhau
      if (error.code === '11000' || error.code === 'ER_DUP_ENTRY' || error.code === 11000) {
        throw new ConflictException('Username đã tồn tại.');
      }

      throw new InternalServerErrorException('Đã xảy ra lỗi khi tạo người dùng.');
    }
  }

  // Cập nhật người dùng
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      await this.userRepository.update(id, updateUserDto);
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Đã xảy ra lỗi khi cập nhật người dùng.');
    }
  }

  // Xóa người dùng theo ID
  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Đã xảy ra lỗi.');
    }
  }
}
