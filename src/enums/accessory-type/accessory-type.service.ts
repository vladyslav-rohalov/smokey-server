import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessoryTypeDto } from './dto/create-accessory-type.dto';
import { UpdateAccessoryTypeDto } from './dto/update-accessory-type.dto';
import { AccessoryType } from './entities/accessory-type.entity';

@Injectable()
export class AccessoryTypeService {
  constructor(
    @InjectRepository(AccessoryType)
    private accessoryTypeRepository: Repository<AccessoryType>,
  ) {}

  async create(createAccessoryTypeDto: CreateAccessoryTypeDto) {
    const type = this.accessoryTypeRepository.create(createAccessoryTypeDto);
    return await this.accessoryTypeRepository.save(type);
  }

  async findAll() {
    const types = await this.accessoryTypeRepository.find();
    return types;
  }

  async getType(typeDto: string) {
    const type = await this.accessoryTypeRepository.findOne({
      where: { type: typeDto },
    });
    return type;
  }

  async update(id: number, updateAccessoryTypeDto: UpdateAccessoryTypeDto) {
    const type = await this.accessoryTypeRepository.findOne({
      where: { id },
    });
    if (!type) {
      throw new NotFoundException(`Accessory type with id ${id} not found`);
    }
    await this.accessoryTypeRepository.update(id, updateAccessoryTypeDto);

    const updatedType = await this.accessoryTypeRepository.findOne({
      where: { id },
    });

    return updatedType;
  }

  async remove(id: number) {
    const type = await this.accessoryTypeRepository.findOne({
      where: { id },
    });
    if (!type) {
      throw new NotFoundException(`Accessory type with id ${id} not found`);
    }
    await this.accessoryTypeRepository.remove(type);
  }
}
