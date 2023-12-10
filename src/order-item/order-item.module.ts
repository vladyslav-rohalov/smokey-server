import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './entities/order-item.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OrderItemService],
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  exports: [OrderItemService],
})
export class OrderItemModule {}
