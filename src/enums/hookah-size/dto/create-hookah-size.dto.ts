import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHookahSizeDto {
  @IsNotEmpty()
  @IsString()
  hookah_size: string;
}
