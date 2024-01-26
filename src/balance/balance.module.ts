import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './db/entities/users.entity';
import { PaymentHistory } from './db/entities/payment-history.entity';
import { UsersRepository } from './db/repositories/ users.repository';
import { PaymentHistoryRepository } from './db/repositories/payment-history.repository';
import { BalanceController } from './balance.controller';
import { UserService } from './user/user.service';
import { PaymentHistoryService } from './payment-history/payment-history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      UsersRepository,
      PaymentHistory,
      PaymentHistoryRepository,
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, UserService, PaymentHistoryService],
})
export class BalanceModule {}
