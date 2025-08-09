import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';

/**
 * AbstractDocument
 * ----------------
 * Đây là lớp schema cơ sở (base schema) cho tất cả các document trong MongoDB.
 * - Được đánh dấu @Schema() để NestJS Mongoose nhận diện như một schema.
 * - Mục tiêu: các entity kế thừa sẽ tự động có trường `_id` và kiểu dữ liệu chuẩn.
 */
@Schema()
export class AbstractDocument {
  /**
   * _id: ObjectId của MongoDB
   * - Luôn là duy nhất cho mỗi document.
   * - Ở đây dùng `@Prop()` để định nghĩa cho Mongoose biết trường này là ObjectId.
   * - `Types.ObjectId` đảm bảo type-safe khi làm việc với TypeScript.
   * - `mongoose.Schema.Types.ObjectId` giúp Mongoose map đúng kiểu dữ liệu trong DB.
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: Types.ObjectId;
}
