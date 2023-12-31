import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Query, UploadedFiles, UseInterceptors, Patch } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { CreateCartDto } from '../cart/dto/create-cart.dto';
import { Express } from 'express';
import { Multer } from 'multer';

type File = Express.Multer.File;

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post('cart')
  @HttpCode(200)
  findIds(@Body() createCartDto: CreateCartDto) {
    return this.productsService.findCart(createCartDto);
  }

  @Get('/promotion')
  findAllPromotion() {
    return this.productsService.findAllPromotion();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/images/:id')
  @UseInterceptors(FilesInterceptor('images'))
  addImages(
    @Param('id') id: string,
    @UploadedFiles() images: File[],
    @Body() bgOptions: { id: string; deleteBG: string; trim: string },
  ) {
    const options = {
      deleteBG: bgOptions.deleteBG === 'true',
      trim: bgOptions.trim === 'true',
    };
    return this.productsService.addImages(+id, images, options);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/images/:id')
  removeImages(@Param('id') id: string, @Body() images: string[]) {
    return this.productsService.removeImages(+id, images);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/publish/:id')
  publish(@Param('id') id: string) {
    return this.productsService.publish(+id);
  }

  @Get('/tabs')
  getTabs() {
    return this.productsService.getTabs();
  }

  @Get('/suggestion')
  getSuggestion(@Query('search') search: string) {
    return this.productsService.getSuggestion(search);
  }
}
