import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { HookahsService } from './hookahs.service';
import { CreateHookahDto } from './dto/create-hookah.dto';
import { UpdateHookahDto } from './dto/update-hookah.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Controller('api/products/hookahs')
export class HookahsController {
  constructor(private readonly hookahsService: HookahsService) {}

  // @Post()
  // createProductWithTobacco(
  //   @Body() createProductDto: CreateProductDto,
  //   @Body() createHookahDto: CreateHookahDto,
  // ) {
  //   return this.hookahsService.createProductWithHookah(
  //     createProductDto,
  //     createHookahDto,
  //   );
  // }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('brand') brand: string,
    @Query('status') status: string,
    @Query('color') color: string,
    @Query('hookah_size') hookahSize: string,
    @Query('min') min: number,
    @Query('max') max: number,
  ) {
    return this.hookahsService.findAllHookahs({
      page,
      limit,
      sort,
      brand,
      status,
      color,
      hookahSize,
      min,
      max,
    });
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body()
  //   updateHookahDto: UpdateHookahDto,
  //   @Body()
  //   updateProductDto: UpdateProductDto,
  // ) {
  //   return this.hookahsService.updateProductWithHookah(
  //     +id,
  //     updateProductDto,
  //     updateHookahDto,
  //   );
  // }
}
