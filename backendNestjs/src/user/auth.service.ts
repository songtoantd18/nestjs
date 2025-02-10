import { BadGatewayException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/LoginUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    private UserService: UserService,
  ) {}

  async register(requestBody: RegisterUserDto) {
    const userByEmail = await this.UserService.findByEmail(requestBody.email);
    if (userByEmail) {
      throw new BadGatewayException('Email already exists');
    }
    //save to db
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hashedPassword;

    const savedUser = await this.UserService.createUserJwt(requestBody);
    // hash password
    console.log(
      '🚀 ~ AuthService ~ register ~ hashedPassword:',
      hashedPassword,
    );
    const payload = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      role: savedUser.role,
      password: savedUser.password,
    };
    // generate token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    console.log(
      '🚀 ~ AuthService ~ register ~ process.env.JWT_SECRET:',
      process.env.JWT_SECRET,
    );
    console.log('🚀 ~ AuthService ~ register ~ accessToken:', accessToken);
    return {
      msg: 'user has been created',
      accessToken,
    };
    //save to db
  }

  async login(requestBody: LoginUserDto) {
    const user = await this.UserService.findByEmail(requestBody.email);
    if (!user) {
      throw new BadGatewayException('Email does not exist');
    }
    const isPasswordValid = await bcrypt.compare(
      requestBody.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadGatewayException('Invalid password');
    }
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    console.log('🚀 ~ AuthService ~ login ~ payload:', payload);
    // generate token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2d',
    });

    return {
      msg: 'User has been login successfully',
      accessToken,
    };
  }
}
