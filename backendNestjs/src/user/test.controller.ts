import { Get,Controller } from '@nestjs/common';
import { TestServices } from './test.service';

@Controller('test') // Đây là decorator bắt buộc cho controller
export class TestController {
  constructor(private testServices :TestServices){}
  @Get()
  render() {
    return this.testServices.calc()
  }
}
