import { IsNumber } from 'class-validator';

export class UserDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  balance: number;
}
