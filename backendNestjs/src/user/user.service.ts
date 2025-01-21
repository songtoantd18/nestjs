import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Not, Repository } from 'typeorm';
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
  createUser(requestBody: any) {
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

  async updateById(id: number, requestBody: any) {
    let user = await this.usersRepository.findOneBy({ id });
    console.log('🚀 ~ UserService ~ updateById ~ user:', user);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // user = { ...user, ...requestBody };
    // return this.usersRepository.save(user);
    await this.usersRepository.update(id, requestBody);
    return this.usersRepository.findOneBy({ id });
  }
  async deleteById(id: number) {
    console.log('đây là delete');
    let user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return this.usersRepository.remove(user);
  }
}
