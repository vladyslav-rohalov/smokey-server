import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CartService, CartItemService],
  imports: [
    BlacklistedTokensModule,
    TypeOrmModule.forFeature([Cart, CartItem, User]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
