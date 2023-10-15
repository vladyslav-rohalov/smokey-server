import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Controller('api/products/accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Post()
  createProductWithTobacco(
    @Body() createAccessoryDto: CreateAccessoryDto,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.accessoriesService.createProductWithAccessory(
      createProductDto,
      createAccessoryDto,
    );
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.accessoriesService.findAllAccessories(page, limit);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateAccessoryDto: UpdateAccessoryDto,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    return this.accessoriesService.updateProductWithAccessory(
      +id,
      updateProductDto,
      updateAccessoryDto,
    );
  }
}
