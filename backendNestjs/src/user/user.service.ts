import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
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
}
