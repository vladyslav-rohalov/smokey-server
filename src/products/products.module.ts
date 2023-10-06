import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Hookah } from 'src/hookahs/entities/hookah.entity';
import { Tobacco } from 'src/tobacco/entities/tobacco.entity';
import { Coal } from 'src/coals/entities/coal.entity';
import { Accessory } from 'src/accessories/entities/accessory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Cart,
      Order,
      Favorite,
      Review,
      Hookah,
      Tobacco,
      Coal,
      Accessory,
    ]),
  ],
})
export class ProductsModule {}
