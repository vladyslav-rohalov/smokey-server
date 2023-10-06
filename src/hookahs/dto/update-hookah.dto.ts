import { PartialType } from '@nestjs/swagger';
import { CreateHookahDto } from './create-hookah.dto';

export class UpdateHookahDto extends PartialType(CreateHookahDto) {}
