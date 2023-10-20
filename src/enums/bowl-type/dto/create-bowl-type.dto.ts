import { IsOptional, IsString } from 'class-validator';

export class CreateBowlTypeDto {
  @IsOptional()
  @IsString()
  bowl_type: string;
}
