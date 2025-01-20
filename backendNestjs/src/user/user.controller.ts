import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get('') // ở đây là localhost:3000/user/demo1 nếu không có '/demo1' thì sẽ là localhost:3000/user
  getUser() {
    console.log('đây là usercontroller1');
    return this.UserService.getUser();
  }
}
