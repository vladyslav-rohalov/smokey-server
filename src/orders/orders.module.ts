import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';
import { OrderItemService } from '../order-item/order-item.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderItemService],
  imports: [
    TypeOrmModule.forFeature([User, Order, OrderItem]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
})
export class OrdersModule {}
