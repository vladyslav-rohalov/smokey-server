import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UseGuards, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

interface IRequest extends Request {
  user: { id: number };
}

@Controller('api/')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('products/favorites')
  findFavoritesProducts(@Req() req: IRequest) {
    const userId = req.user.id;
    return this.favoritesService.findFavoriteProducts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  findFavorite(@Req() req: IRequest) {
    const userId = req.user.id;
    return this.favoritesService.findFavorite(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites/:id')
  addToFavorite(@Req() req: IRequest, @Param('id') id: string) {
    const userId = req.user.id;
    return this.favoritesService.addToFavorite(userId, +id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('favorites/:id')
  removeFromFavorite(@Req() req: IRequest, @Param('id') id: string) {
    const userId = req.user.id;
    return this.favoritesService.removeFromFavorite(userId, +id);
  }
}
