import 'reflect-metadata';
import 'dotenv/config';
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
import { Comment } from './comments/entities/comment.entity';
import { ReviewRating } from './review-rating/entities/review-rating.entity';
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
    Comment,
    ReviewRating,
  ],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
