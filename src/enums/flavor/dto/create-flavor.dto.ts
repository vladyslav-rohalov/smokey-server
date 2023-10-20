import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlavorDto {
  @IsNotEmpty()
  @IsString()
  flavor: string;
}
