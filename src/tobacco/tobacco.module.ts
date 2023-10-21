import { Module } from '@nestjs/common';
import { TobaccoService } from './tobacco.service';
import { TobaccoController } from './tobacco.controller';
import { Tobacco } from './entities/tobacco.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { FlavorService } from 'src/enums/flavor/flavor.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';
import { Flavor } from 'src/enums/flavor/entities/flavor.entity';
@Module({
  controllers: [TobaccoController],
  providers: [TobaccoService, ProductsService, FlavorService],
  imports: [
    TypeOrmModule.forFeature([Tobacco, Product, Flavor]),
    BrandModule,
    PromotionModule,
  ],
})
export class TobaccoModule {}
