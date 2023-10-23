import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Hookah } from 'src/hookahs/entities/hookah.entity';
import { Tobacco } from 'src/tobacco/entities/tobacco.entity';
import { Coal } from 'src/coals/entities/coal.entity';
import { Accessory } from 'src/accessories/entities/accessory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from 'src/enums/brand/brand.service';
import { Brand } from 'src/enums/brand/entities/brand.entity';
import { PromotionService } from 'src/enums/promotion/promotion.service';
import { Promotion } from 'src/enums/promotion/entities/promotion.entity';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, BrandService, PromotionService, AwsS3Service],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      CartItem,
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
    ]),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
