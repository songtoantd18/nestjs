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
    console.log('➡️ [AuthService] login() called');
    const tokenPayload = {
      userId: user._id.toHexString(),
    };
    console.log(
      '🚀 ~ AuthService ~ login ~ tokenPayload123123123123:',
      tokenPayload,
    );
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload);
    console.log('🚀 ~ AuthService ~ login ~ token:', token);
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
