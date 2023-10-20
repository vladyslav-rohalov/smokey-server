import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBowlTypeDto } from './dto/create-bowl-type.dto';
import { UpdateBowlTypeDto } from './dto/update-bowl-type.dto';
import { BowlType } from './entities/bowl-type.entity';

@Injectable()
export class BowlTypeService {
  constructor(
    @InjectRepository(BowlType)
    private bowlTypeRepository: Repository<BowlType>,
  ) {}

  async create(createBowlTypeDto: CreateBowlTypeDto) {
    const bowlType = this.bowlTypeRepository.create(createBowlTypeDto);
    return await this.bowlTypeRepository.save(bowlType);
  }

  async findAll() {
    const bowlTypes = await this.bowlTypeRepository.find();
    return bowlTypes;
  }

  async update(id: number, updateBowlTypeDto: UpdateBowlTypeDto) {
    const bowlType = await this.bowlTypeRepository.findOne({
      where: { id },
    });
    if (!bowlType) {
      throw new NotFoundException(`Bowl type with id ${id} not found`);
    }
    await this.bowlTypeRepository.update(id, updateBowlTypeDto);

    const updatedBowlType = await this.bowlTypeRepository.findOne({
      where: { id },
    });

    return updatedBowlType;
  }

  async remove(id: number) {
    const bowlType = await this.bowlTypeRepository.findOne({
      where: { id },
    });
    if (!bowlType) {
      throw new NotFoundException(`Bowl type with id ${id} not found`);
    }
    await this.bowlTypeRepository.remove(bowlType);
  }
}
