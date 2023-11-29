import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';
import { OrderItemService } from 'src/order-item/order-item.service';

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
