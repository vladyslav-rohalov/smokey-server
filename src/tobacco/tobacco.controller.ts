import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TobaccoService } from './tobacco.service';
import { CreateTobaccoDto } from './dto/create-tobacco.dto';
import { UpdateTobaccoDto } from './dto/update-tobacco.dto';

@Controller('tobacco')
export class TobaccoController {
  constructor(private readonly tobaccoService: TobaccoService) {}

  @Post()
  create(@Body() createTobaccoDto: CreateTobaccoDto) {
    return this.tobaccoService.create(createTobaccoDto);
  }

  @Get()
  findAll() {
    return this.tobaccoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tobaccoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTobaccoDto: UpdateTobaccoDto) {
    return this.tobaccoService.update(+id, updateTobaccoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tobaccoService.remove(+id);
  }
}
