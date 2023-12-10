import { Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { UseGuards, Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

interface IRequest extends Request {
  user: { id: number };
}

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Req() req: IRequest, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id;
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserOrders(@Req() req: IRequest) {
    const userId = req.user.id;
    return this.ordersService.getUserOrders(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  cancelOrder(@Req() req: IRequest, @Param('id') id: string) {
    const userId = req.user.id;
    return this.ordersService.cancelOrder(userId, +id);
  }
}
