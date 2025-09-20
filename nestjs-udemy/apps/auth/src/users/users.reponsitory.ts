import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { UsersDocument } from './model/users.schema';

@Injectable() // 📌 Đánh dấu class này có thể được inject (DI) ở nơi khác
export class UsersRepository extends AbstractRepository<UsersDocument> {
  // 📌 Khai báo logger riêng cho repository này
  // `UsersRepository.name` => trả về string "UsersRepository"
  // để log có context rõ ràng (biết log này từ class nào)
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    // 📌 Inject Mongoose Model của UsersDocument vào repository
    // NestJS sẽ tự động cung cấp model này từ MongooseModule.forFeature()
    @InjectModel(UsersDocument.name)
    UsersModel: Model<UsersDocument>,
  ) {
    // 📌 Gọi constructor của class cha (AbstractRepository)
    // và truyền vào model để AbstractRepository có thể sử dụng
    super(UsersModel);

    // 📌 In ra logger để kiểm tra
    console.log('🚀 ~ UsersRepository ~ logger instance:', this.logger);

    // 📌 In ra tên của schema (UsersDocument) để chắc chắn model đã được inject
    console.log(
      '🚀 UsersRepository initialized with model:',
      UsersDocument.name,
    );
  }
}
