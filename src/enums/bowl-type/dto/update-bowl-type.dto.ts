import { PartialType } from '@nestjs/swagger';
import { CreateBowlTypeDto } from './create-bowl-type.dto';

export class UpdateBowlTypeDto extends PartialType(CreateBowlTypeDto) {}
