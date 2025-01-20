import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor() {}
  sayhi() {
    console.log('đây là testservice');
    return 'đang chạy test';
  }
}
