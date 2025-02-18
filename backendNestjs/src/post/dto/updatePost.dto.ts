import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  userId: number;
}
