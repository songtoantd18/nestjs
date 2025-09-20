import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  constructor() {
    console.log('📄 CreateUserDto instantiated');
  }
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
