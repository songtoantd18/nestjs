
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_entity')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;


  
}
