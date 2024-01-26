import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PaymentHistory } from './payment-history.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.user)
  paymentHistory: PaymentHistory[];
}
