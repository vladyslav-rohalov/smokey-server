import { IsNumber, IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
