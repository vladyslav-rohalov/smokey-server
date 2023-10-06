import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HookahsService } from './hookahs.service';
import { CreateHookahDto } from './dto/create-hookah.dto';
import { UpdateHookahDto } from './dto/update-hookah.dto';

@Controller('hookahs')
export class HookahsController {
  constructor(private readonly hookahsService: HookahsService) {}

  @Post()
  create(@Body() createHookahDto: CreateHookahDto) {
    return this.hookahsService.create(createHookahDto);
  }

  @Get()
  findAll() {
    return this.hookahsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hookahsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHookahDto: UpdateHookahDto) {
    return this.hookahsService.update(+id, updateHookahDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hookahsService.remove(+id);
  }
}
