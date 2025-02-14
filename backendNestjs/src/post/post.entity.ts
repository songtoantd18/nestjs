import { Exclude, Transform } from 'class-transformer';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @ManyToOne(() => User, (user) => user.posts)
  @Transform(({ obj }) => obj.user.email)
  user: User;

  // @ManyToOne(() => User, (user) => user.posts)
  // @Transform(({ obj }) => ({
  //   id: obj.user.id,
  //   email: obj.user.email,
  // }))
  // user: { id: number; email: string };
}
