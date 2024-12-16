// user.schema.ts
import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestJS_Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';  // Thêm dòng này
// Đảm bảo bạn sử dụng đúng class để khai báo schema
@NestJS_Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
