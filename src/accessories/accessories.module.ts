import { Module, forwardRef } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { AccessoriesController } from './accessories.controller';
import { Accessory } from './entities/accessory.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { BrandModule } from '../enums/brand/brand.module';
import { PromotionModule } from '../enums/promotion/promotion.module';
import { AccessoryTypeService } from '../enums/accessory-type/accessory-type.service';
import { BowlTypeService } from '../enums/bowl-type/bowl-type.service';
import { AccessoryType } from '../enums/accessory-type/entities/accessory-type.entity';
import { BowlType } from '../enums/bowl-type/entities/bowl-type.entity';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

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
    TypeOrmModule.forFeature([
      Accessory,
      Product,
      AccessoryType,
      BowlType,
      JwtModule,
    ]),
    BrandModule,
    PromotionModule,
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
})
export class AccessoriesModule {}
