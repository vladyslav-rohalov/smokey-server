import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto[], orderId: number) {
    const savedOrderItems: OrderItem[] = [];

    for (const itemDto of createOrderItemDto) {
      const existingOrderItem = await this.orderItemRepository.findOne({
        where: {
          order: { id: orderId },
          product: { id: itemDto.productId },
        },
      });

      if (!existingOrderItem) {
        const orderItem = this.orderItemRepository.create(itemDto);
        const order: Partial<Order> = { id: orderId };
        const product: Partial<Product> = { id: itemDto.productId };

        orderItem.order = order as Order;
        orderItem.product = product as Product;
        orderItem.buyingPrice = 0;

        await this.orderItemRepository.save(orderItem);
        const orderItemWithProduct = await this.orderItemRepository.findOne({
          where: { id: orderItem.id },
          relations: ['product'],
        });
        orderItemWithProduct.buyingPrice = orderItemWithProduct.product.price;
        await this.orderItemRepository.save(orderItemWithProduct);
        savedOrderItems.push(orderItemWithProduct);
      }
    }
    return savedOrderItems;
  }

  async remove(orderId: number, productId: number) {
    await this.orderItemRepository.delete({
      order: { id: orderId },
      product: { id: productId },
    });
  }
}
