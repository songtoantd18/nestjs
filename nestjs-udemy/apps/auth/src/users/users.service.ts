import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersRepository } from './users.reponsitory';
@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {
    console.log('⚙️ UsersService initialized ở service ');
  }
  async create(createUserDto: CreateUserDto) {
    return this.UsersRepository.create(createUserDto);
  }

  findAll() {
    return this.UsersRepository.find({});
  }

  findOne(_id: string) {
    return this.UsersRepository.findOne({ _id });
  }

  remove(_id: string) {
    return this.UsersRepository.findOneAndDelete({ _id });
  }
}
