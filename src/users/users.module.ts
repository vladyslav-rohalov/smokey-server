import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddressesService } from '../addresses/addresses.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Address } from '../addresses/entities/address.entity';
import { Order } from '../orders/entities/order.entity';
import { Review } from '../reviews/entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AddressesService],
  imports: [
    TypeOrmModule.forFeature([User, Address, Order, Review, JwtModule]),

    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
