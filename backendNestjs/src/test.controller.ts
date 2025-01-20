import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/test123')
  test() {
    console.log('đây là testcontroller');
    return this.testService.sayhi();
  }
}
