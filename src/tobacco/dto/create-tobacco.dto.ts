import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTobaccoDto {
  @IsString()
  @IsNotEmpty()
  readonly flavor: string;

  @IsNumber()
  @IsNotEmpty()
  readonly tobacco_weight: number;

  @IsNumber()
  @IsOptional()
  readonly strength: number;
}
