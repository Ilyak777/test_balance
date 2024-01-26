import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../db/entities/users.entity';
import { PaymentHistory } from '../db/entities/payment-history.entity';
import { UserDTO } from '../user/dto/user.dto';
import { nowString } from 'src/utils/dateNow';

@Injectable()
export class PaymentHistoryService {
  constructor(
    @InjectRepository(PaymentHistory)
    private readonly paymentHistoryRepository: Repository<PaymentHistory>,
  ) {}

  async addPayment(user: UserDTO, amount: number) {
    try {
      return await this.paymentHistoryRepository.manager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.update(
            Users,
            { id: user.id },
            { balance: user.balance - amount },
          );

          await transactionalEntityManager.insert(PaymentHistory, {
            user: user,
            action: 'purchase',
            amount: -amount,
          });
        },
      );
    } catch (error) {
      console.log(`ошибка ${error} при обработке платежа в ${nowString()}`);
    }
  }
}
