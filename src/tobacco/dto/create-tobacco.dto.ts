import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { IsEnum } from 'class-validator';
import { Flavor } from 'src/enums/flavor/entities/flavor.entity';

export class CreateTobaccoDto {
  @IsEnum(Flavor)
  @IsNotEmpty()
  readonly flavor: Flavor;

  @IsNumber()
  @IsNotEmpty()
  readonly tobacco_weight: number;

  @IsNumber()
  @IsOptional()
  readonly strength: number;
}
