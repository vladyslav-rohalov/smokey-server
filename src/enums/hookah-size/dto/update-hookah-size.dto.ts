import { PartialType } from '@nestjs/swagger';
import { CreateHookahSizeDto } from './create-hookah-size.dto';

export class UpdateHookahSizeDto extends PartialType(CreateHookahSizeDto) {}
