import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../user/user.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    // config: dùng field 'email' thay vì 'username'
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.userService.verifyUser(email, password);
      console.log('🚀 ~ LocalStrategy ~ validate ~ user:', user);
      return user; // passport sẽ gán vào req.user
    } catch (err) {
      // rethrow như Unauthorized
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
    }
  }
}
