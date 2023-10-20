import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { AccessoryType } from 'src/enums/accessory-type/entities/accessory-type.entity';
import { BowlType } from 'src/enums/bowl-type/entities/bowl-type.entity';

export class CreateAccessoryDto {
  @IsNotEmpty()
  @IsEnum(AccessoryType)
  readonly type: AccessoryType;

  @IsOptional()
  @IsEnum(BowlType)
  readonly bowl_type: BowlType;
}
