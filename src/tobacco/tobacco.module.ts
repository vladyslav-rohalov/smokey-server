import { Module } from '@nestjs/common';
import { TobaccoService } from './tobacco.service';
import { TobaccoController } from './tobacco.controller';
import { Tobacco } from './entities/tobacco.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';

@Module({
  controllers: [TobaccoController],
  providers: [TobaccoService, ProductsService],
  imports: [
    TypeOrmModule.forFeature([Tobacco, Product]),
    BrandModule,
    PromotionModule,
  ],
})
export class TobaccoModule {}
