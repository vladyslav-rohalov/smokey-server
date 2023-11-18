import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private cartItemService: CartItemService,
  ) {}

  async addToCart(userId: number, createCartDto: CreateCartDto) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!cart) {
      const newCart = await this.createCart(userId);
      await this.cartItemService.create(createCartDto.items, newCart.id);
    } else {
      await this.cartItemService.create(createCartDto.items, cart.id);
    }
    return await this.getCartProductsWithQuantity(userId);
  }

  async updateCartQuantity(userId: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }
    await this.cartItemService.update(cart.id, updateCartDto.items[0]);

    return await this.getCartProductsWithQuantity(userId);
  }

  async getCartProducts(userId: number) {
    const cart = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }
    return await this.getCartProductsWithQuantity(userId);
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }

    await this.cartItemService.remove(cart.id, productId);

    return await this.getCartProductsWithQuantity(userId);
  }

  async createCart(userId: number) {
    const user: Partial<User> = { id: userId };
    const cart = this.cartRepository.create({
      user: user as User,
    });
    await this.cartRepository.save(cart);
    return cart;
  }

  async getCartProductsWithQuantity(userId: number): Promise<Product[]> {
    const cart = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }
    return cart[0].items.map(item => {
      const product = item.product;
      return {
        ...product,
        quantity: item.quantity,
      };
    });
  }
}
