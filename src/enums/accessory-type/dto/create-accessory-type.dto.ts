import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccessoryTypeDto {
  @IsNotEmpty()
  @IsString()
  type: string;
}
