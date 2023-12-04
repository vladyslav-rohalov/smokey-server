import { Injectable, NotFoundException } from '@nestjs/common';
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
    const savedCartItems: CartItem[] = [];

    for (const itemDto of createCartItemDto) {
      const existingCartItem = await this.cartItemRepository.findOne({
        where: {
          cart: { id: cartId },
          product: { id: itemDto.productId },
        },
      });

      if (!existingCartItem) {
        const cartItem = this.cartItemRepository.create(itemDto);
        const cart: Partial<Cart> = { id: cartId };
        const product: Partial<Product> = { id: itemDto.productId };

        cartItem.cart = cart as Cart;
        cartItem.product = product as Product;

        await this.cartItemRepository.save(cartItem);
        savedCartItems.push(cartItem);
      }
    }

    return savedCartItems;
  }

  async remove(cartId: number, productId: number) {
    await this.cartItemRepository.delete({
      cart: { id: cartId },
      product: { id: productId },
    });
  }

  async update(cartId: number, updateCartItemDto: UpdateCartItemDto) {
    return await this.cartItemRepository.update(
      {
        cart: { id: cartId },
        product: { id: updateCartItemDto.productId },
      },
      { quantity: updateCartItemDto.quantity },
    );
  }

  async removeAll(cartId: number): Promise<void> {
    const cartItems = await this.cartItemRepository.find({
      where: { cart: { id: cartId } },
    });

    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException('Cart have no products');
    }

    await this.cartItemRepository.remove(cartItems);
  }
}
