import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { PaymentHistoryService } from './payment-history/payment-history.service';
import { nowString } from 'src/utils/dateNow';

@Injectable()
export class BalanceService {
  constructor(
    private userService: UserService,
    private paymentHistoryService: PaymentHistoryService,
  ) {}

  async purchaseItem(amount: number): Promise<number> {
    const user = await this.userService.find();

    if (user.balance < amount) {
      throw new ConflictException('не хватает средств');
    }

    await this.paymentHistoryService.addPayment(user, amount);

    return amount;
  }
}
