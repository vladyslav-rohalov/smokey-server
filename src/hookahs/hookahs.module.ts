import { Module } from '@nestjs/common';
import { HookahsService } from './hookahs.service';
import { HookahsController } from './hookahs.controller';
import { Hookah } from './entities/hookah.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';
import { HookahSizeService } from 'src/enums/hookah-size/hookah-size.service';
import { HookahSize } from 'src/enums/hookah-size/entities/hookah-size.entity';
import { ColorService } from 'src/enums/color/color.service';
import { Color } from 'src/enums/color/entities/color.entity';

@Module({
  controllers: [HookahsController],
  providers: [HookahsService, ProductsService, HookahSizeService, ColorService],
  imports: [
    TypeOrmModule.forFeature([Hookah, Product, HookahSize, Color]),
    BrandModule,
    PromotionModule,
  ],
})
export class HookahsModule {}
