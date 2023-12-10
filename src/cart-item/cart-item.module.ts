import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CartItemService],
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product])],
  exports: [CartItemService],
})
export class CartItemModule {}
