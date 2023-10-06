import { PartialType } from '@nestjs/swagger';
import { CreateCoalDto } from './create-coal.dto';

export class UpdateCoalDto extends PartialType(CreateCoalDto) {}
