import { IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
