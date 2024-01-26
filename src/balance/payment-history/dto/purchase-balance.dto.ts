import { IsNumber } from 'class-validator';

export class PurchaseBalanceDto {
  @IsNumber()
  amount: number;
}
