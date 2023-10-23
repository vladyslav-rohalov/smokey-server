import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UploadedFiles } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';

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

  @Post('/images/:id')
  @UseInterceptors(FilesInterceptor('images'))
  addImages(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productsService.addImages(+id, images);
  }

  @Delete('/images/:id')
  removeImages(@Param('id') id: string, @Body() images: string[]) {
    return this.productsService.removeImages(+id, images);
  }
}
