import { Controller, Get, Post, Body, Req, HttpCode } from '@nestjs/common';
import { UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

interface IRequest extends Request {
  user: { id: number };
}

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: IRequest, @Body() createCartDto: CreateCartDto) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, createCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  find(@Req() req: IRequest) {
    const userId = req.user.id;
    return this.cartService.getCartProducts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req: IRequest, @Body() updateCartDto: UpdateCartDto) {
    const userId = req.user.id;
    return this.cartService.updateCartQuantity(userId, updateCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Req() req: IRequest, @Param('id') id: string) {
    const userId = req.user.id;
    return this.cartService.removeFromCart(userId, +id);
  }
}
