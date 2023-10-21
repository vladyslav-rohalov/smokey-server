import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHookahSizeDto } from './dto/create-hookah-size.dto';
import { UpdateHookahSizeDto } from './dto/update-hookah-size.dto';
import { HookahSize } from './entities/hookah-size.entity';

@Injectable()
export class HookahSizeService {
  constructor(
    @InjectRepository(HookahSize)
    private hookahSizeRepository: Repository<HookahSize>,
  ) {}

  async create(createHookahSizeDto: CreateHookahSizeDto) {
    const hookahSize = this.hookahSizeRepository.create(createHookahSizeDto);
    return await this.hookahSizeRepository.save(hookahSize);
  }

  async findAll() {
    const hookahSizes = await this.hookahSizeRepository.find();
    return hookahSizes;
  }

  async getHookahSize(hookah_sizeDto: string) {
    const hookahSize = await this.hookahSizeRepository.findOne({
      where: { hookah_size: hookah_sizeDto },
    });
    return hookahSize;
  }

  async update(id: number, updateHookahSizeDto: UpdateHookahSizeDto) {
    const hookahSize = await this.hookahSizeRepository.findOne({
      where: { id },
    });
    if (!hookahSize) {
      throw new NotFoundException(`Hookah size with id ${id} not found`);
    }
    await this.hookahSizeRepository.update(id, updateHookahSizeDto);

    const updatedHookahSize = await this.hookahSizeRepository.findOne({
      where: { id },
    });

    return updatedHookahSize;
  }

  async remove(id: number) {
    const hookahSize = await this.hookahSizeRepository.findOne({
      where: { id },
    });
    if (!hookahSize) {
      throw new NotFoundException(`Hookah size with id ${id} not found`);
    }
    await this.hookahSizeRepository.remove(hookahSize);
  }
}
