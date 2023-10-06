import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoalsService } from './coals.service';
import { CreateCoalDto } from './dto/create-coal.dto';
import { UpdateCoalDto } from './dto/update-coal.dto';

@Controller('coals')
export class CoalsController {
  constructor(private readonly coalsService: CoalsService) {}

  @Post()
  create(@Body() createCoalDto: CreateCoalDto) {
    return this.coalsService.create(createCoalDto);
  }

  @Get()
  findAll() {
    return this.coalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoalDto: UpdateCoalDto) {
    return this.coalsService.update(+id, updateCoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coalsService.remove(+id);
  }
}
