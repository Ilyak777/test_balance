import { Entity, Repository } from 'typeorm';
import { PaymentHistory } from '../entities/payment-history.entity';

@Entity()
export class PaymentHistoryRepository extends Repository<PaymentHistory> {}
