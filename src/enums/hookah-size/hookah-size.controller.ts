import { Controller, Body, Param } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { HookahSizeService } from './hookah-size.service';
import { CreateHookahSizeDto } from './dto/create-hookah-size.dto';
import { UpdateHookahSizeDto } from './dto/update-hookah-size.dto';

@Controller('api/enum/hookah-size')
export class HookahSizeController {
  constructor(private readonly hookahSizeService: HookahSizeService) {}

  @Post()
  create(@Body() createHookahSizeDto: CreateHookahSizeDto) {
    return this.hookahSizeService.create(createHookahSizeDto);
  }

  @Get()
  findAll() {
    return this.hookahSizeService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHookahSizeDto: UpdateHookahSizeDto,
  ) {
    return this.hookahSizeService.update(+id, updateHookahSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hookahSizeService.remove(+id);
  }
}
