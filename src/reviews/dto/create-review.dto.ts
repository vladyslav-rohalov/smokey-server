import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  readonly pros: string;

  @IsString()
  @IsNotEmpty()
  readonly cons: string;

  @IsString()
  @IsNotEmpty()
  rating: number;
}
