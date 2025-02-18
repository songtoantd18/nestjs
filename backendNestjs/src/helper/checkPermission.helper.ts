import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export class Permission {
  static checkPermission(id: number, currentUser: User) {
  
    console.log('🚀 ~ Permission ~ checkPermission ~ id:yyyyyyyyyyyyyyyyyyyyyyy', id);
    console.log(
      '🚀 ~ Permission ~ checkPermission ~ currentUser.id:yyyyyyyyyyyyyyyyyyyyyyyyyy',
      currentUser.id,
    );
    if (currentUser.id === id) return;
    if (currentUser.role === 'admin') return;

    throw new BadRequestException(
      'You do not have permission to access this resource',
    );
  }
}
