import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export class Permission {
  static checkPermission(id: number, currentUser: User) {
    console.log(
      '🚀 ~ Permission ~ checkPermission ~ currentUser:',
      currentUser,
    );
    console.log('🚀 ~ Permission ~ checkPermission ~ id:', id);
    if (currentUser.id === id) return;
    if (currentUser.role === 'admin') return;

    throw new BadRequestException(
      'You do not have permission to access this resource',
    );
  }
}
