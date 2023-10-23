import { Module } from '@nestjs/common';
import { CoalsService } from './coals.service';
import { CoalsController } from './coals.controller';
import { Coal } from './entities/coal.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  controllers: [CoalsController],
  providers: [CoalsService, ProductsService, AwsS3Service],
  imports: [
    TypeOrmModule.forFeature([Coal, Product]),
    BrandModule,
    PromotionModule,
  ],
})
export class CoalsModule {}
