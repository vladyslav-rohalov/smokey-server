import { Module } from '@nestjs/common';
import { CoalsService } from './coals.service';
import { CoalsController } from './coals.controller';
import { Coal } from './entities/coal.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';

@Module({
  controllers: [CoalsController],
  providers: [CoalsService, ProductsService],
  imports: [
    TypeOrmModule.forFeature([Coal, Product]),
    BrandModule,
    PromotionModule,
  ],
})
export class CoalsModule {}
