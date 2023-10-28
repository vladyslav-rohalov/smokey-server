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
    // console.log('page ', page);
    // console.log('limit ', limit);
    // console.log('sort ', sort);
    // console.log('id ', id);
    // console.log('images ', images);
    // console.log('publish ', publish);
    // console.log('brand ', brand);
    // console.log('status ', status);
    // console.log('min ', min);
    // console.log('max ', max);
    // console.log('promotion ', promotion);

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

  @Patch('/publish/:id')
  publish(@Param('id') id: string) {
    return this.productsService.publish(+id);
  }
}
