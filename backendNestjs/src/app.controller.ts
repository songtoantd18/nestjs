import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // cái này là dependency injection
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/test')
  sayhi() {
    console.log('đây là controller111111');
    return this.appService.sayhi();
  }
}
