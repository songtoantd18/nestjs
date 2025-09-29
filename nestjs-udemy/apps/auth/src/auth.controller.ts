import {
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UsersDocument } from './users/model/users.schema';
import { Response } from 'express'; // ✅ thêm dòng này
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard) // 1
  @Post('login') // 2
  @HttpCode(200) // 3
  async login(
    @CurrentUser() user: UsersDocument, // 4
    @Res({ passthrough: true }) response: Response, // 5
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
