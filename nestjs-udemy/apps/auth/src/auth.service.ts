import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; // nếu dùng
import { response, Response } from 'express';
import { UsersDocument } from './users/model/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    private readonly configService: ConfigService,
  ) {}

  async login(user: UsersDocument, res: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
