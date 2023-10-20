import { IsNotEmpty, IsEnum } from 'class-validator';
import { HookahSize } from 'src/enums/hookah-size/entities/hookah-size.entity';
import { Color } from 'src/enums/color/entities/color.entity';

export class CreateHookahDto {
  @IsEnum(Color)
  @IsNotEmpty()
  color: Color;

  @IsEnum(HookahSize)
  @IsNotEmpty()
  hookah_size: HookahSize;
}
