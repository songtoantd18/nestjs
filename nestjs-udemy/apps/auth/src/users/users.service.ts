import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersRepository } from './users.reponsitory';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {
    console.log('⚙️ UsersService initialized ở service ');
  }
  async create(createUserDto: CreateUserDto) {
    return this.UsersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.findOne(email);
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('credential are not valid');
    }
    return user;
  }
  async findByEmail(_id: string) {
    return this.UsersRepository.findOne({ _id });
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
