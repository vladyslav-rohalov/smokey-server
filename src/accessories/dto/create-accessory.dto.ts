import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type, Bowl_Type } from '../entities/accessory.entity';

export class CreateAccessoryDto {
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @IsOptional()
  @IsEnum(Bowl_Type)
  bowl_type: Bowl_Type;
}
