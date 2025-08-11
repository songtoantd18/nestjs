import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { ReservationDocument } from './models/reservation.schema';
// import { ReservationDocument } from './reservations/models/reservation.schema';@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel); // 📌 Gọi constructor cha trước

    console.log(
      '🚀 ~ ReservationsRepository ~ logger:123123123123',
      this.logger, // Bây giờ mới an toàn
    );
    console.log(
      '🚀 ReservationsRepository initialized with model:',
      ReservationDocument.name,
    );
  }
}
