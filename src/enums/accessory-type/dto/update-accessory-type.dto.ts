import { PartialType } from '@nestjs/swagger';
import { CreateAccessoryTypeDto } from './create-accessory-type.dto';

export class UpdateAccessoryTypeDto extends PartialType(CreateAccessoryTypeDto) {}
