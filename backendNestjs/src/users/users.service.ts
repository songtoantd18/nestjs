import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(user: User): User {
    console.log("🚀 ~ UsersService ~ create ~ user:", user)
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    console.log("🚀 ~ UsersService ~ findOne ~ id:", id)
    return this.users.find(user => user.id === id);
  }

  update(id: number, userData: Partial<User>): User {
    console.log("🚀 ~ UsersService ~ update ~ userData:", userData)
    console.log("🚀 ~ UsersService ~ update ~ id:", id)
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, userData);
    }
    return user;
  }

  remove(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
