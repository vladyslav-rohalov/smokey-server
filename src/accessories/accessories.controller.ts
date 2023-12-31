import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { AccessoriesService } from './accessories.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';


@Controller('api/products/accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Query('type') type: string,
    @Query('bowl_type') bowlType: string,
    @Query('min') min: number,
    @Query('max') max: number,
  ) {
    return this.accessoriesService.findAllAccessories({
      page,
      limit,
      sort,
      brand,
      status,
      type,
      bowlType,
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
    updateAccessoryDto: CreateAccessoryDto,
    @Body()
    updateProductDto: CreateProductDto,
  ) {
    return this.accessoriesService.updateProductWithAccessory(
      +id,
      updateProductDto,
      updateAccessoryDto,
    );
  }
}
