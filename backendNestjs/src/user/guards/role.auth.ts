import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUser } from './../decorate/user.decorator';
import { request } from 'http';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private roles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('------22222222222');
    const request = context.switchToHttp().getRequest();
    const user = request.currentUser;
    console.log('🚀 ~ RoleGuard ~ user:----------------', user.role);
    console.log('🚀 ~ RoleGuard ~ this.roles:------------------', this.roles);
    if (!user) {
      throw new ForbiddenException(' bạn chưa đăng nhập');
    }
    if (!this.roles.includes(user.role.toLowerCase())) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    return true;
  }
}
