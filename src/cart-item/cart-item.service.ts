import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto[], cartId: number) {
    const cartItems = createCartItemDto.map(async itemDto => {
      const cartItem = this.cartItemRepository.create(itemDto);

      const cart: Partial<Cart> = { id: cartId };
      cartItem.cart = cart as Cart;

      const product: Partial<Product> = { id: itemDto.productId };
      cartItem.product = product as Product;

      await this.cartItemRepository.save(cartItem);

      return cartItem;
    });
    const savedCartItems = await Promise.all(cartItems);

    return savedCartItems;
  }

  async remove(cartId: number, productId: number) {
    await this.cartItemRepository.delete({
      cart: { id: cartId },
      product: { id: productId },
    });
  }
}

// findAll() {
//   return `This action returns all cartItem`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} cartItem`;
// }

// update(id: number, updateCartItemDto: UpdateCartItemDto) {
//   return `This action updates a #${id} cartItem`;
// }

// remove(id: number) {
//   return `This action removes a #${id} cartItem`;
// }
