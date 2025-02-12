import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
    console.log('🚀 ~ RoleGuard ~ request--------:', request.currentUser);

    console.log(
      '🚀 ~ RoleGuard ~ this.roles.includes(request.currentUser.role.toLowerCase()):',
      this.roles.includes(request.currentUser.role.toLowerCase()),
    );
    return this.roles.includes(request.currentUser.role.toLowerCase());
  }
}
