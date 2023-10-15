import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
    // нужно преобразовать ответ, рзгладить категории
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('/promotion')
  findAllPromotion() {
    return this.productsService.findAllPromotion();
  }

  // @Post(':id/images')
  // addImages(@Param('id') id: string, @Body() images: string[]) {
  //   return this.productsService.addImages(+id, images);
  // }
}
