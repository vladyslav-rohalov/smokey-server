import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCoalDto {
  @IsNumber()
  @IsNotEmpty()
  coal_size: number;

  @IsNumber()
  @IsNotEmpty()
  coal_weight: number;
}
