import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [CartController],
  providers: [CartService, CartItemService],
  imports: [
    TypeOrmModule.forFeature([User, Cart, CartItem, JwtModule]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
})
export class CartModule {}
