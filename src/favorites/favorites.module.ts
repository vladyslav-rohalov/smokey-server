import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([User, Product, Favorite]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
})
export class FavoritesModule {}
