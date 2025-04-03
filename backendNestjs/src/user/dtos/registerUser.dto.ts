import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
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

  @IsOptional() // Make role optional
  @IsEnum(roles, { message: 'Role phải là admin, user hoặc moderator' })
  role?: roles; // Use ? to indicate it's optional
}
