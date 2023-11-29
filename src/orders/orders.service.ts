import { Injectable } from '@nestjs/common';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderItemService } from 'src/order-item/order-item.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderItemService: OrderItemService,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const user: Partial<User> = { id: userId };
    const newOrder = this.orderRepository.create({
      user: user as User,
    });
    newOrder.total = 0;
    await this.orderRepository.save(newOrder);

    const orderItems = await this.orderItemService.create(
      createOrderDto.items,
      newOrder.id,
    );
    const total = orderItems.reduce(
      (acc, { buyingPrice, quantity }) => acc + buyingPrice * quantity,
      0,
    );
    await this.orderRepository.update(newOrder.id, {
      total,
    });
    const response = await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: ['items', 'items.product'],
    });
    return response;
  }

  async getUserOrders(userId: number) {
    const userOrders = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!userOrders) {
      return [];
    }
    return userOrders;
  }

  async cancelOrder(userId: number, id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order wasn't found`);
    }

    if (order.status !== 'pending') {
      throw new ForbiddenException(
        `You cannot delete an order in the status ${order.status}`,
      );
    }
    order.status = OrderStatus.CANCELLED;

    await this.orderRepository.save(order);
    return order;
  }
}
