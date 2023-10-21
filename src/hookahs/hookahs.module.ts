import { Module } from '@nestjs/common';
import { HookahsService } from './hookahs.service';
import { HookahsController } from './hookahs.controller';
import { Hookah } from './entities/hookah.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';

@Module({
  controllers: [HookahsController],
  providers: [HookahsService, ProductsService],
  imports: [
    TypeOrmModule.forFeature([Hookah, Product]),
    BrandModule,
    PromotionModule,
  ],
})
export class HookahsModule {}
