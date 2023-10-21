import { Injectable } from '@nestjs/common';
import { AccessoryTypeService } from './accessory-type/accessory-type.service';
import { BowlTypeService } from './bowl-type/bowl-type.service';
import { BrandService } from './brand/brand.service';
import { ColorService } from './color/color.service';
import { FlavorService } from './flavor/flavor.service';
import { HookahSizeService } from './hookah-size/hookah-size.service';
import { PromotionService } from './promotion/promotion.service';

@Injectable()
export class EnumsService {
  constructor(
    private accessoryTypeService: AccessoryTypeService,
    private bowlTypeService: BowlTypeService,
    private brandService: BrandService,
    private colorService: ColorService,
    private flavorService: FlavorService,
    private hookahSizeService: HookahSizeService,
    private promotionService: PromotionService,
  ) {}

  async findAll() {
    const types = await this.accessoryTypeService.findAll();
    const bowl_types = await this.bowlTypeService.findAll();
    const brands = await this.brandService.findAll();
    const colors = await this.colorService.findAll();
    const flavors = await this.flavorService.findAll();
    const hookah_size = await this.hookahSizeService.findAll();
    const promotions = await this.promotionService.findAll();

    return {
      types,
      bowl_types,
      brands,
      colors,
      flavors,
      hookah_size,
      promotions,
    };
  }
}
