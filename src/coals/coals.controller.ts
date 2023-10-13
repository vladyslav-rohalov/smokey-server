import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
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
  findAll() {
    return this.coalsService.findAllcoal();
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
