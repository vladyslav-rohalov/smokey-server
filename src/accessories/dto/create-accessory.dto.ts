import { IsNotEmpty, IsOptional, IsEnum, IsString } from 'class-validator';
// import { AccessoryType } from 'src/enums/accessory-type/entities/accessory-type.entity';
// import { BowlType } from 'src/enums/bowl-type/entities/bowl-type.entity';

export class CreateAccessoryDto {
  // @IsNotEmpty()
  // @IsEnum(AccessoryType)
  // readonly type: AccessoryType;
  @IsNotEmpty()
  @IsString()
  readonly type: string;
  // @IsOptional()
  // @IsEnum(BowlType)
  // readonly bowl_type: BowlType;
  @IsOptional()
  @IsString()
  readonly bowl_type: string;
}
