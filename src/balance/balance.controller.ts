import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { PurchaseBalanceDto } from './payment-history/dto/purchase-balance.dto';

@Controller('purchase')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post('/')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async purchase(
    @Body() { amount }: PurchaseBalanceDto,
  ): Promise<{ message: string; amount: number }> {
    await this.balanceService.purchaseItem(amount);
    return { message: `Успешное приобретение`, amount: amount };
  }
}
