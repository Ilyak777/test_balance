import { IsNotEmpty } from 'class-validator';

export class SkinDTO {
  @IsNotEmpty()
  market_hash_name: string;

  @IsNotEmpty()
  currency: string;

  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number | null;
  min_price_non_tradable: number | undefined;
  mean_price: number | null;
  median_price: number | null;
  quantity: number;
  created_at: number;
  updated_at: number;
}
