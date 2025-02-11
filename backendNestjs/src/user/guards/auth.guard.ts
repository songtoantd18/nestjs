import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadGatewayException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private JwtService: JwtService,
    private UserService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('đây là authguard');
    const request = context.switchToHttp().getRequest();
    // return validateRequest(request);
    try {
      // lấy token từ header
      const token = request.headers.authorization.split(' ')[1];
      console.log('🚀 ~ AuthGuard ~ token:111111:', token);
      if (!token) {
        throw new ForbiddenException('Please provide access token');
      }

      //2  jwtverify validation token kiểm tra token hợp lệ không
      const palyload = await this.JwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('🚀 ~ AuthGuard ~ canActivate ~ palyload:', palyload);
      //3 find user by email sử dụng trong auth service
      const user = await this.UserService.findByEmail(palyload.email);
      console.log(
        '🚀 ~ AuthGuard ~ canActivate ~ user:222222222222222222222',
        user,
      );
      if (!user) {
        throw new BadGatewayException('Email does not exist');
      }
      //4 assign user to request object
      request.currentUser = user;
      return true;
    } catch (error) {
      console.log('🚀 ~ AuthGuard ~ canActivate ~ error:', error);
      throw new BadGatewayException('Invalid token or expired token');
    }
  }
}
