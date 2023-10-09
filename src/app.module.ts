import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { Address } from './addresses/entities/address.entity';
import { Cart } from './cart/entities/cart.entity';
import { Product } from './products/entities/product.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { Review } from './reviews/entities/review.entity';
import { Hookah } from './hookahs/entities/hookah.entity';
import { Tobacco } from './tobacco/entities/tobacco.entity';
import { Coal } from './coals/entities/coal.entity';
import { CartItem } from './cart-item/entities/cart-item.entity';
import { OrderItem } from './order-item/entities/order-item.entity';
import { Accessory } from './accessories/entities/accessory.entity';
import { Comment } from './comments/entities/comment.entity';
import { ReviewRating } from './review-rating/entities/review-rating.entity';
import { BlacklistedToken } from './blacklisted-tokens/entities/blacklisted-token.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsModule } from './products/products.module';
import { AddressesModule } from './addresses/addresses.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { HookahsModule } from './hookahs/hookahs.module';
import { TobaccoModule } from './tobacco/tobacco.module';
import { CoalsModule } from './coals/coals.module';
import { AccessoriesModule } from './accessories/accessories.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CommentsModule } from './comments/comments.module';
import { ReviewRatingModule } from './review-rating/review-rating.module';
import { BlacklistedTokensModule } from './blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          User,
          Order,
          Address,
          Cart,
          Product,
          Favorite,
          Review,
          Hookah,
          Tobacco,
          Coal,
          Accessory,
          CartItem,
          OrderItem,
          Comment,
          ReviewRating,
          BlacklistedToken,
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    ReviewsModule,
    ProductsModule,
    AddressesModule,
    CartModule,
    FavoritesModule,
    HookahsModule,
    TobaccoModule,
    CoalsModule,
    AccessoriesModule,
    CartItemModule,
    OrderItemModule,
    CommentsModule,
    ReviewRatingModule,
    BlacklistedTokensModule,
  ],
})
export class AppModule {}
