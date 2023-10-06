import { PartialType } from '@nestjs/swagger';
import { CreateTobaccoDto } from './create-tobacco.dto';

export class UpdateTobaccoDto extends PartialType(CreateTobaccoDto) {}
