import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNotEmpty()
  readonly house: string;

  @IsOptional()
  readonly appartment: string;
}
