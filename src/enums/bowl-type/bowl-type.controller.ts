import { Controller, Body, Param } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { BowlTypeService } from './bowl-type.service';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateBowlTypeDto } from './dto/create-bowl-type.dto';
import { UpdateBowlTypeDto } from './dto/update-bowl-type.dto';

@Controller('api/enum/bowl-type')
export class BowlTypeController {
  constructor(private readonly bowlTypeService: BowlTypeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createBowlTypeDto: CreateBowlTypeDto) {
    return this.bowlTypeService.create(createBowlTypeDto);
  }

  @Get()
  findAll() {
    return this.bowlTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBowlTypeDto: UpdateBowlTypeDto,
  ) {
    return this.bowlTypeService.update(+id, updateBowlTypeDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bowlTypeService.remove(+id);
  }
}
