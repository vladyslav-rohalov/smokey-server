import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { TobaccoService } from './tobacco.service';
import { CreateTobaccoDto } from './dto/create-tobacco.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';

@Controller('api/products/tobacco')
export class TobaccoController {
  constructor(private readonly tobaccoService: TobaccoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTobaccoDto: CreateTobaccoDto,
    @Body()
    updateProductDto: CreateProductDto,
  ) {
    return this.tobaccoService.updateProductWithTobacco(
      +id,
      updateProductDto,
      updateTobaccoDto,
    );
  }
}
