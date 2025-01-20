import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  sayhi() {
    console.log('đây là service2222222');
    return 'đang chạy test';
  }
}
