import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTobaccoDto {
  @IsString()
  @IsNotEmpty()
  flavor: string;

  @IsNumber()
  @IsNotEmpty()
  tobacco_weight: number;

  @IsNumber()
  @IsOptional()
  strength: number;
}
