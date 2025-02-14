import { Exclude } from 'class-transformer';
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

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
  @ManyToOne(
    () => User,
    (user) => {
      console.log('🚀 ~ Post ~ user:', user);
      return user.posts;
    },
  )
  user: User;
}
