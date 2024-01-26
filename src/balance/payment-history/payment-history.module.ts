import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentHistory } from '../db/entities/payment-history.entity';
import { PaymentHistoryService } from './payment-history.service';
import { PaymentHistoryRepository } from '../db/repositories/payment-history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentHistory, PaymentHistoryRepository]),
  ],
  providers: [PaymentHistoryService],
})
export class PaymentHistoryModule {}
