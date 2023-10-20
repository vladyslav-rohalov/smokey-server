import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Promotion } from 'src/enums/promotion/entities/promotion.entity';
import { Brand } from 'src/enums/brand/entities/brand.entity';

// enum Promotion {
//   HOT = 'hot',
//   SALE = 'sale',
//   NEW = 'new',
//   None = 'none',
// }

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

  @IsEnum(Brand)
  @IsNotEmpty()
  readonly brand: Brand;

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
