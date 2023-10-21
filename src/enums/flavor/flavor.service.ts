import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class FlavorService {
  constructor(
    @InjectRepository(Flavor)
    private flavorRepository: Repository<Flavor>,
  ) {}

  async create(createFlavorDto: CreateFlavorDto) {
    const flavor = this.flavorRepository.create(createFlavorDto);
    return await this.flavorRepository.save(flavor);
  }

  async findAll() {
    const flavors = await this.flavorRepository.find();
    return flavors;
  }

  async getFlavor(flavorDto: string) {
    const flavor = await this.flavorRepository.findOne({
      where: { flavor: flavorDto },
    });
    return flavor;
  }

  async update(id: number, updateFlavorDto: UpdateFlavorDto) {
    const flavor = await this.flavorRepository.findOne({
      where: { id },
    });
    if (!flavor) {
      throw new NotFoundException(`Flavor with id ${id} not found`);
    }
    await this.flavorRepository.update(id, updateFlavorDto);

    const updatedFlavor = await this.flavorRepository.findOne({
      where: { id },
    });

    return updatedFlavor;
  }

  async remove(id: number) {
    const flavor = await this.flavorRepository.findOne({
      where: { id },
    });
    if (!flavor) {
      throw new NotFoundException(`Flavor with id ${id} not found`);
    }
    await this.flavorRepository.remove(flavor);
  }
}
