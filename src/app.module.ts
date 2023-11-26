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
import { BlacklistedToken } from './blacklisted-tokens/entities/blacklisted-token.entity';
import { Promotion } from './enums/promotion/entities/promotion.entity';
import { Brand } from './enums/brand/entities/brand.entity';
import { Flavor } from './enums/flavor/entities/flavor.entity';
import { Color } from './enums/color/entities/color.entity';
import { AccessoryType } from './enums/accessory-type/entities/accessory-type.entity';
import { BowlType } from './enums/bowl-type/entities/bowl-type.entity';
import { HookahSize } from './enums/hookah-size/entities/hookah-size.entity';
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
import { BlacklistedTokensModule } from './blacklisted-tokens/blacklisted-tokens.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { PromotionModule } from './enums/promotion/promotion.module';
import { BrandModule } from './enums/brand/brand.module';
import { FlavorModule } from './enums/flavor/flavor.module';
import { ColorModule } from './enums/color/color.module';
import { AccessoryTypeModule } from './enums/accessory-type/accessory-type.module';
import { BowlTypeModule } from './enums/bowl-type/bowl-type.module';
import { HookahSizeModule } from './enums/hookah-size/hookah-size.module';
import { EnumsModule } from './enums/enums.module';

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
          BlacklistedToken,
          Promotion,
          Brand,
          Flavor,
          Color,
          AccessoryType,
          BowlType,
          HookahSize,
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
    BlacklistedTokensModule,
    AwsS3Module,
    PromotionModule,
    BrandModule,
    FlavorModule,
    ColorModule,
    AccessoryTypeModule,
    BowlTypeModule,
    HookahSizeModule,
    EnumsModule,
  ],
})
export class AppModule {}
