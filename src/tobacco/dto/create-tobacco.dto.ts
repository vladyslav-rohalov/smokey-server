import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateTobaccoDto extends CreateProductDto {
  @IsString()
  @IsNotEmpty()
  flavor: string;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsOptional()
  strength: number;
}
