import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBowlTypeDto {
  @IsNotEmpty()
  @IsString()
  bowl_type: string;
}
