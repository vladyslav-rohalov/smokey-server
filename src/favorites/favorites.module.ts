import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TypeOrmModule.forFeature([User, Product, Favorite])],
})
export class FavoritesModule {}
