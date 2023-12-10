import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Review } from '../reviews/entities/review.entity';
import { Hookah } from '../hookahs/entities/hookah.entity';
import { Tobacco } from '../tobacco/entities/tobacco.entity';
import { Coal } from '../coals/entities/coal.entity';
import { Accessory } from '../accessories/entities/accessory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from '../enums/brand/brand.service';
import { Brand } from '../enums/brand/entities/brand.entity';
import { PromotionService } from '../enums/promotion/promotion.service';
import { Promotion } from '../enums/promotion/entities/promotion.entity';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { AwsS3Module } from '../services/aws-s3/aws-s3.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, BrandService, PromotionService, AwsS3Service],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      OrderItem,
      Favorite,
      Review,
      Hookah,
      Tobacco,
      Coal,
      Accessory,
      Brand,
      Promotion,
      AwsS3Module,
      JwtModule,
    ]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  exports: [ProductsService, ProductsModule],
})
export class ProductsModule {}
