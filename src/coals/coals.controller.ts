import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { CoalsService } from './coals.service';
import { CreateCoalDto } from './dto/create-coal.dto';
import { UpdateCoalDto } from './dto/update-coal.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Controller('api/products/coals')
export class CoalsController {
  constructor(private readonly coalsService: CoalsService) {}

  @Post()
  createProductWithTobacco(
    @Body() createProductDto: CreateProductDto,
    @Body() createCoalDto: CreateCoalDto,
  ) {
    return this.coalsService.createProductWithCoal(
      createProductDto,
      createCoalDto,
    );
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('brand') brand: string,
    @Query('status') status: string,
    @Query('coal_size') coalSize: string,
    @Query('coal_weight') coalWeight: string,
    @Query('min') min: number,
    @Query('max') max: number,
  ) {
    return this.coalsService.findAllСoals({
      page,
      limit,
      sort,
      brand,
      status,
      coalSize,
      coalWeight,
      min,
      max,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateCoalDto: UpdateCoalDto,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    return this.coalsService.updateProductWithCoals(
      +id,
      updateProductDto,
      updateCoalDto,
    );
  }
}
