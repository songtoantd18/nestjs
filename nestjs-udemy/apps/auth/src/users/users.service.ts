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
    console.log('🚀 ~ UsersService ~ verifyUser ~ password:', password);
    console.log('🚀 ~ UsersService ~ verifyUser ~ email:', email);
    const user = await this.findOneByEmail(email);
    console.log('🚀 ~ UsersService ~ verifyUser ~ user:', user);
    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log(
      '🚀 ~ UsersService ~ verifyUser ~ passwordIsValid:',
      passwordIsValid,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('credential are not valid');
    }
    return user;
  }
  findOneByEmail(email: string) {
    return this.UsersRepository.findOne({ email });
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
