import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  promotion: string;
}
