import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// file user.entity.ts có chức năng tạo table user
//  định nghĩa các trường và dạng của các trường number
// hay string hay email password
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;
}
