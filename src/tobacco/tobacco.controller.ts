import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
  findAll() {
    return this.tobaccoService.findAllTobacco();
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
