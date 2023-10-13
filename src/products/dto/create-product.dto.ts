import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { IsNotEmpty } from 'class-validator';

enum Promotion {
  HOT = 'hot',
  SALE = 'sale',
  NEW = 'new',
  None = 'none',
}

enum Status {
  IN_STOCK = 'in stock',
  OUT_OF_STOCK = 'out of stock',
  ENDING = 'ending',
  AWAITING = 'awaiting',
}

export class CreateProductDto {
  @IsEnum(Promotion)
  @IsNotEmpty()
  readonly promotion: Promotion;

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
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly available: number;
}
