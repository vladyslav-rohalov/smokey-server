import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/entities/cart.entity';
import { CartItemService } from '../cart-item/cart-item.service';
import { CartItem } from '../cart-item/entities/cart-item.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from '../strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmailService } from '../services/email/email.servise';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    CartService,
    CartItemService,
    GoogleStrategy,
    EmailService,
  ],
  imports: [
    BlacklistedTokensModule,
    TypeOrmModule.forFeature([Cart, CartItem, User]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
