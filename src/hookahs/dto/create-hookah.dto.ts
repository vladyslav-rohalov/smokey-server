import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHookahDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  hookah_size: string;
}
