import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCoalDto {
  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;
}
