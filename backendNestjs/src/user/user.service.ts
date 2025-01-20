import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}
  getUser() {
    console.log('đây là userservice2');
    return 'đây là userservice3';
  }
}
