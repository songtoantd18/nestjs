import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestJS_Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@NestJS_Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: string;  // Thêm trường role
}

export const UserSchema = SchemaFactory.createForClass(User);