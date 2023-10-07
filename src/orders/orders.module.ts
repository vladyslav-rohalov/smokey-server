import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([User, Order, OrderItem])],
})
export class OrdersModule {}
