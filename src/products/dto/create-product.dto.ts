import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';

enum Status {
  IN_STOCK = 'in stock',
  OUT_OF_STOCK = 'out of stock',
  ENDING = 'ending',
  AWAITING = 'awaiting',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly promotion: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsEnum(Status)
  @IsNotEmpty()
  readonly status: Status;

  @IsArray()
  @IsOptional()
  readonly images: string[];

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly available: number;
}
