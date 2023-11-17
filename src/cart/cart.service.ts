import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private cartItemService: CartItemService,
  ) {}

  async addToCart(userId: number, createCartDto: CreateCartDto) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!cart) {
      const newCart = await this.create(userId);
      const items = await this.cartItemService.create(
        createCartDto.items,
        newCart.id,
      );
      return items;
    } else {
      const items = await this.cartItemService.create(
        createCartDto.items,
        cart.id,
      );
      return items;
    }
  }

  async create(userId: number) {
    const user: Partial<User> = { id: userId };
    const cart = this.cartRepository.create({
      user: user as User,
    });
    await this.cartRepository.save(cart);
    return cart;
  }
}
