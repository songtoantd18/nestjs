import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { roles } from '../user.entity';

export class RegisterUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;
  @IsEnum(roles, { message: 'Role phải là admin, user hoặc moderator' })
  role: roles;
}
