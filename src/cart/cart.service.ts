import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { CartItemService } from '../cart-item/cart-item.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private cartItemService: CartItemService,
  ) {}

  async addToCart(
    userId: number,
    createCartDto: CreateCartDto,
  ): Promise<Product[]> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });
    let cartItems = [];
    if (!cart) {
      const newCart = await this.createCart(userId);
      cartItems = await this.cartItemService.create(
        createCartDto.items,
        newCart.id,
      );
    } else {
      cartItems = await this.cartItemService.create(
        createCartDto.items,
        cart.id,
      );
    }

    const updatedCartItems = await this.cartRepository.find({
      where: {
        user: { id: userId },
        items: cartItems.map(item => ({ id: item.id })),
      },
      relations: ['items', 'items.product'],
    });

    if (!updatedCartItems) {
      throw new NotFoundException(`Cart items not found`);
    }

    return updatedCartItems[0].items.map(item => {
      const product = item.product;
      const quantity =
        item.quantity > product.available ? product.available : item.quantity;
      return {
        ...product,
        quantity,
      };
    });
  }

  async updateCartQuantity(
    userId: number,
    updateCartDto: UpdateCartDto,
  ): Promise<Product[]> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }
    await this.cartItemService.update(cart.id, updateCartDto.items[0]);
    const productId = updateCartDto.items[0].productId;

    const updatedCartItem = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('cart.user = :userId', { userId })
      .andWhere('product.id = :productId', { productId })
      .getOne();

    return updatedCartItem.items.map(item => {
      const product = item.product;
      const quantity =
        item.quantity > product.available ? product.available : item.quantity;
      return {
        ...product,
        quantity,
      };
    });
  }

  async getCartProducts(userId: number): Promise<Product[]> {
    const cart = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }

    return cart[0].items.map(item => {
      const product = item.product;
      const quantity =
        item.quantity > product.available ? product.available : item.quantity;
      return {
        ...product,
        quantity,
      };
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }

    await this.cartItemService.remove(cart.id, productId);
  }

  async clearCart(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart wasn't found`);
    }

    await this.cartItemService.removeAll(cart.id);
    await this.cartRepository.save(cart);
  }

  async createCart(userId: number) {
    const user: Partial<User> = { id: userId };
    const cart = this.cartRepository.create({
      user: user as User,
    });
    await this.cartRepository.save(cart);
    return cart;
  }
}
