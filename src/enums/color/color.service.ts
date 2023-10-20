import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  async create(createColorDto: CreateColorDto) {
    const color = this.colorRepository.create(createColorDto);
    return await this.colorRepository.save(color);
  }

  async findAll() {
    const colors = await this.colorRepository.find();
    return colors;
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    const color = await this.colorRepository.findOne({
      where: { id },
    });
    if (!color) {
      throw new NotFoundException(`Color with id ${id} not found`);
    }
    await this.colorRepository.update(id, updateColorDto);

    const updatedColor = await this.colorRepository.findOne({
      where: { id },
    });

    return updatedColor;
  }

  async remove(id: number) {
    const color = await this.colorRepository.findOne({
      where: { id },
    });
    if (!color) {
      throw new NotFoundException(`Color with id ${id} not found`);
    }
    await this.colorRepository.remove(color);
  }
}
