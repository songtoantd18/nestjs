import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { roles } from './user.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
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
  async findAllByAdmin() {
    const users = await this.usersRepository.find({
      where: { role: roles.user },
    });

    console.log('đây là find all tất cả value', users.length);

    return users;
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
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hashedPassword;
    // Cập nhật user trong database
    const dataUpdate = await this.usersRepository.update(id, requestBody);

    // Trả về thông tin cần thiết
    return {
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      email: requestBody.email,
      role: requestBody.role,
      password: requestBody.password,
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
