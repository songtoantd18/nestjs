import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { Permission } from 'src/helper/checkPermission.helper';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  getUser() {
    console.log('đây là userservice2');
    return 'đây là userservice3';
  }
  createUser(requestBody: CreateUserDto) {
    console.log('đây là userservice2221');
    return this.usersRepository.save(requestBody);
  }
  createUserJwt(requestBody: RegisterUserDto) {
    console.log('đây là userservice2221');
    return this.usersRepository.save(requestBody);
  }
  findAll() {
    console.log('đây là find all tất cả value');
    return this.usersRepository.find();
  }
  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    console.log('🚀 ~ UserService ~ findById ~ user:', user);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async updateById(id: number, requestBody: UpdateUserDto, currentUser: User) {
    let user = await this.usersRepository.findOneBy({ id });
    console.log('🚀 ~ UserService ~ updateById ~ user:', user);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    Permission.checkPermission(id, currentUser);

    // Cập nhật user trong database
    const dataUpdate = await this.usersRepository.update(id, requestBody);
    console.log('🚀 ~ UserService ~ updateById ~ dataUpdate:', dataUpdate);

    // Trả về thông tin cần thiết
    return {
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      email: requestBody.email,
    };
  }

  async deleteById(id: number) {
    console.log('đây là delete');
    let user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return this.usersRepository.remove(user);
  }
  async findByEmail(email: string) {
    console.log('🚀 ~ UserService ~ findOneByEmail ~ email:', email);
    return this.usersRepository.findOneBy({ email });
  }
}
