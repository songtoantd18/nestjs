import { Exclude } from 'class-transformer';
import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../comment/comment.entity';

export enum roles {
  admin = 'admin',
  user = 'user',
  moderator = 'moderator',
}
@Entity()
// file user.entity.ts có chức năng tạo table user
//  định nghĩa các trường và dạng của các trường number
// hay string hay email password
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column({ default: roles.user })
  role: roles;

  @Exclude()
  @Column()
  password: string;
  @OneToMany(
    () => Post,
    (post) => {
      console.log('🚀 ~ User ~ post:1111111', post.user);
      return post.user;
    },
  )
  posts: Post[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
