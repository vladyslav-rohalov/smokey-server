import { Controller, Get, Post, Body, Req } from '@nestjs/common';
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
  findAll(@Req() req: IRequest) {
    const userId = req.user.id;
    return this.cartService.getCartProducts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: IRequest, @Param('id') id: string) {
    const userId = req.user.id;
    return this.cartService.removeFromCart(userId, +id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
