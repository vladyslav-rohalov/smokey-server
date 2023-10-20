import { Injectable } from '@nestjs/common';
import { CreateBowlTypeDto } from './dto/create-bowl-type.dto';
import { UpdateBowlTypeDto } from './dto/update-bowl-type.dto';

@Injectable()
export class BowlTypeService {
  create(createBowlTypeDto: CreateBowlTypeDto) {
    return 'This action adds a new bowlType';
  }

  findAll() {
    return `This action returns all bowlType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bowlType`;
  }

  update(id: number, updateBowlTypeDto: UpdateBowlTypeDto) {
    return `This action updates a #${id} bowlType`;
  }

  remove(id: number) {
    return `This action removes a #${id} bowlType`;
  }
}
