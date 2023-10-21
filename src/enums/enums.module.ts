import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnumsController } from './enums.controller';
import { EnumsService } from './enums.service';
import { AccessoryTypeService } from './accessory-type/accessory-type.service';
import { BowlTypeService } from './bowl-type/bowl-type.service';
import { BrandService } from './brand/brand.service';
import { ColorService } from './color/color.service';
import { FlavorService } from './flavor/flavor.service';
import { HookahSizeService } from './hookah-size/hookah-size.service';
import { PromotionService } from './promotion/promotion.service';
import { AccessoryType } from './accessory-type/entities/accessory-type.entity';
import { BowlType } from './bowl-type/entities/bowl-type.entity';
import { Brand } from './brand/entities/brand.entity';
import { Promotion } from './promotion/entities/promotion.entity';
import { Color } from './color/entities/color.entity';
import { Flavor } from './flavor/entities/flavor.entity';
import { HookahSize } from './hookah-size/entities/hookah-size.entity';

@Module({
  controllers: [EnumsController],
  providers: [
    EnumsService,
    AccessoryTypeService,
    BowlTypeService,
    BrandService,
    PromotionService,
    ColorService,
    FlavorService,
    HookahSizeService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      AccessoryType,
      BowlType,
      Brand,
      Promotion,
      Color,
      Flavor,
      HookahSize,
    ]),
  ],
})
export class EnumsModule {}
