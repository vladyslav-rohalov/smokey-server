import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { CartItem } from '../cart-item/entities/cart-item.entity';
import { CartItemService } from '../cart-item/cart-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [CartController],
  providers: [CartService, CartItemService],
  imports: [
    TypeOrmModule.forFeature([User, Cart, CartItem]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  exports: [CartModule],
})
export class CartModule {}
