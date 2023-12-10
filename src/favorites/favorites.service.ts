import { Injectable, ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async findFavorite(userId: number) {
    const favoriteIds = [];
    const favorite = await this.favoriteRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['product'],
    });
    if (favorite) {
      favorite.forEach(item => favoriteIds.push(item.product.id));
    }
    return favoriteIds;
  }

  async findFavoriteProducts(userId: number) {
    const favoriteProducts = [];
    const favorite = await this.favoriteRepository.find({
      where: {
        user: { id: userId },
      },
      relations: [
        'product',
        'product.brand',
        'product.promotion',
        'product.tobacco',
        'product.hookahs',
        'product.coals',
        'product.accessories',
      ],
    });
    if (favorite) {
      favorite.forEach(item => favoriteProducts.push(item.product));
    }
    return favoriteProducts;
  }

  async addToFavorite(userId: number, id: number) {
    const isExisted = await this.findOne(userId, id);
    if (isExisted) {
      throw new ConflictException('Already added to favorites');
    }
    const favorite = this.favoriteRepository.create();
    const product: Partial<Product> = { id };
    const user: Partial<User> = { id: userId };
    favorite.product = product as Product;
    favorite.user = user as User;
    await this.favoriteRepository.save(favorite);
    return { productId: id };
  }

  async removeFromFavorite(userId: number, id: number) {
    const isExisted = await this.findOne(userId, id);
    if (!isExisted) {
      throw new NotFoundException();
    }
    return await this.favoriteRepository.remove(isExisted);
  }

  async findOne(userId: number, id: number) {
    return await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        product: { id },
      },
    });
  }
}
