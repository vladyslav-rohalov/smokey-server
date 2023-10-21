import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccessoryDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly bowl_type: string;
}
