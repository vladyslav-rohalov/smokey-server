import { Module } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { AccessoriesController } from './accessories.controller';
import { Accessory } from './entities/accessory.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';
import { AccessoryTypeService } from 'src/enums/accessory-type/accessory-type.service';
import { BowlTypeService } from 'src/enums/bowl-type/bowl-type.service';
import { AccessoryType } from 'src/enums/accessory-type/entities/accessory-type.entity';
import { BowlType } from 'src/enums/bowl-type/entities/bowl-type.entity';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  controllers: [AccessoriesController],
  providers: [
    AccessoriesService,
    ProductsService,
    AccessoryTypeService,
    BowlTypeService,
    AwsS3Service,
  ],
  imports: [
    TypeOrmModule.forFeature([Accessory, Product, AccessoryType, BowlType]),
    BrandModule,
    PromotionModule,
  ],
})
export class AccessoriesModule {}
