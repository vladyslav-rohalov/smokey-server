import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Size } from '../entities/hookah.entity';

export class CreateHookahDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsEnum(Size)
  @IsNotEmpty()
  hookah_size: Size;
}
