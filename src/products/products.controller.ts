import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Query, UploadedFiles, UseInterceptors, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('id') id: number,
    @Query('images') images: boolean,
    @Query('publish') publish: boolean,
    @Query('brand') brand: string,
    @Query('status') status: string,
    @Query('min') min: number,
    @Query('max') max: number,
    @Query('promotion') promotion: string,
  ) {
    return this.productsService.findAll({
      page,
      limit,
      sort,
      id,
      images,
      publish,
      brand,
      status,
      min,
      max,
      promotion,
    });
  }

  @Get('/related/:id')
  findRelated(@Param('id') id: string) {
    return this.productsService.findRelatedById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('ids/:ids')
  findIds(@Param('ids') ids: string) {
    return this.productsService.findIds(ids);
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
    @Body() bgOptions: { id: string; deleteBG: string; trim: string },
  ) {
    const options = {
      deleteBG: bgOptions.deleteBG === 'true',
      trim: bgOptions.trim === 'true',
    };
    return this.productsService.addImages(+id, images, options);
  }

  @Delete('/images/:id')
  removeImages(@Param('id') id: string, @Body() images: string[]) {
    return this.productsService.removeImages(+id, images);
  }

  @Patch('/publish/:id')
  publish(@Param('id') id: string) {
    return this.productsService.publish(+id);
  }
}
