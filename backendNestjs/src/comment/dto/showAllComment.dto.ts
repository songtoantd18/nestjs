// comment.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class ShowAllCommentDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  postId: number;

  @IsOptional()
  @IsInt()
  userId: number;
}
