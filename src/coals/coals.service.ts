import { Injectable } from '@nestjs/common';
import { CreateCoalDto } from './dto/create-coal.dto';
import { UpdateCoalDto } from './dto/update-coal.dto';

@Injectable()
export class CoalsService {
  create(createCoalDto: CreateCoalDto) {
    return 'This action adds a new coal';
  }

  findAll() {
    return `This action returns all coals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coal`;
  }

  update(id: number, updateCoalDto: UpdateCoalDto) {
    return `This action updates a #${id} coal`;
  }

  remove(id: number) {
    return `This action removes a #${id} coal`;
  }
}
