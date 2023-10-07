import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
})
export class OrderItemModule {}
