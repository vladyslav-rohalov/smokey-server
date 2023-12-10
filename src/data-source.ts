import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
import { Accessory } from './accessories/entities/accessory.entity';
import { CartItem } from './cart-item/entities/cart-item.entity';
import { OrderItem } from './order-item/entities/order-item.entity';
import { BlacklistedToken } from './blacklisted-tokens/entities/blacklisted-token.entity';
import { Promotion } from './enums/promotion/entities/promotion.entity';
import { Brand } from './enums/brand/entities/brand.entity';
import { Flavor } from './enums/flavor/entities/flavor.entity';
import { Color } from './enums/color/entities/color.entity';
import { AccessoryType } from './enums/accessory-type/entities/accessory-type.entity';
import { BowlType } from './enums/bowl-type/entities/bowl-type.entity';
import { HookahSize } from './enums/hookah-size/entities/hookah-size.entity';

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
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
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
