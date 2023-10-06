import { Injectable } from '@nestjs/common';
import { CreateTobaccoDto } from './dto/create-tobacco.dto';
import { UpdateTobaccoDto } from './dto/update-tobacco.dto';

@Injectable()
export class TobaccoService {
  create(createTobaccoDto: CreateTobaccoDto) {
    return 'This action adds a new tobacco';
  }

  findAll() {
    return `This action returns all tobacco`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tobacco`;
  }

  update(id: number, updateTobaccoDto: UpdateTobaccoDto) {
    return `This action updates a #${id} tobacco`;
  }

  remove(id: number) {
    return `This action removes a #${id} tobacco`;
  }
}
