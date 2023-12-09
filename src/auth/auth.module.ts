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
import { GoogleStrategy } from '../strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmailService } from 'src/services/email/email.servise';
// import { EmailModule } from 'src/services/email/email.module';
import 'dotenv/config';

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
