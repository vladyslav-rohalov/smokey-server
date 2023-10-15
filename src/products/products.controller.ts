import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.findAll(page, limit);
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
