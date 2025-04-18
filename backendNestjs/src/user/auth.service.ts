import { BadGatewayException, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { roles } from './user.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    private UserService: UserService,
  ) {}

  // In AuthService.register method
  async register(requestBody: RegisterUserDto) {
    const userByEmail = await this.UserService.findByEmail(requestBody.email);
    if (userByEmail) {
      throw new BadGatewayException('Email already exists');
    }

    // Set default role to 'user' if not provided
    if (!requestBody.role) {
      requestBody.role = roles.user;
    }

    // Validate role is one of allowed values
    const validRoles = ['admin', 'moderator', 'user'];
    if (!validRoles.includes(requestBody.role)) {
      throw new BadGatewayException(
        'Invalid role. Must be admin, moderator, or user',
      );
    }

    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hashedPassword;

    const savedUser = await this.UserService.createUserJwt(requestBody);

    const payload = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      role: savedUser.role,
      password: savedUser.password,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      msg: 'user has been created',
      accessToken,
    };
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
  getCurrentUser(@Request() req) {
    console.log('đây là getCurrentUser', req.currentUser);
    return req.currentUser;
  }
}
