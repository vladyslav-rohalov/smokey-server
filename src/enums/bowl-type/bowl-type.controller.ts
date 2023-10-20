import { Controller, Body, Param } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { BowlTypeService } from './bowl-type.service';
import { CreateBowlTypeDto } from './dto/create-bowl-type.dto';
import { UpdateBowlTypeDto } from './dto/update-bowl-type.dto';

@Controller('api/enum/bowl-type')
export class BowlTypeController {
  constructor(private readonly bowlTypeService: BowlTypeService) {}

  @Post()
  create(@Body() createBowlTypeDto: CreateBowlTypeDto) {
    return this.bowlTypeService.create(createBowlTypeDto);
  }

  @Get()
  findAll() {
    return this.bowlTypeService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBowlTypeDto: UpdateBowlTypeDto,
  ) {
    return this.bowlTypeService.update(+id, updateBowlTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bowlTypeService.remove(+id);
  }
}
