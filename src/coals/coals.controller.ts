import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { CoalsService } from './coals.service';
import { CreateCoalDto } from './dto/create-coal.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';


@Controller('api/products/coals')
export class CoalsController {
  constructor(private readonly coalsService: CoalsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Query('id') id: number,
    @Query('images') images: boolean,
    @Query('publish') publish: boolean,
    @Query('promotion') promotion: string,
    @Query('brand') brand: string,
    @Query('status') status: string,
    @Query('size') coalSize: string,
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
    updateCoalDto: CreateCoalDto,
    @Body()
    updateProductDto: CreateProductDto,
  ) {
    return this.coalsService.updateProductWithCoals(
      +id,
      updateProductDto,
      updateCoalDto,
    );
  }
}
