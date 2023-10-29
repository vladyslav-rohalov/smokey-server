import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { TobaccoService } from './tobacco.service';
import { CreateTobaccoDto } from './dto/create-tobacco.dto';
import { UpdateTobaccoDto } from './dto/update-tobacco.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Controller('api/products/tobacco')
export class TobaccoController {
  constructor(private readonly tobaccoService: TobaccoService) {}

  @Post()
  createProductWithTobacco(
    @Body() createProductDto: CreateProductDto,
    @Body() createTobaccoDto: CreateTobaccoDto,
  ) {
    return this.tobaccoService.createProductWithTobacco(
      createProductDto,
      createTobaccoDto,
    );
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('id') id: number,
    @Query('images') images: boolean,
    @Query('publish') publish: boolean,
    @Query('promotion') promotion: string,
    @Query('brand') brand: string,
    @Query('status') status: string,
    @Query('flavor') flavor: string,
    @Query('tobacco_weight') weight: string,
    @Query('strength') strength: string,
    @Query('min') min: number,
    @Query('max') max: number,
  ) {
    return this.tobaccoService.findAllTobacco({
      page,
      limit,
      sort,
      brand,
      status,
      flavor,
      weight,
      strength,
      min,
      max,
      id,
      images,
      publish,
      promotion,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTobaccoDto: UpdateTobaccoDto,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    return this.tobaccoService.updateProductWithTobacco(
      +id,
      updateProductDto,
      updateTobaccoDto,
    );
  }
}
