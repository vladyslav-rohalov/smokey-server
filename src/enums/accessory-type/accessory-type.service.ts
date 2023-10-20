import { Injectable } from '@nestjs/common';
import { CreateAccessoryTypeDto } from './dto/create-accessory-type.dto';
import { UpdateAccessoryTypeDto } from './dto/update-accessory-type.dto';

@Injectable()
export class AccessoryTypeService {
  create(createAccessoryTypeDto: CreateAccessoryTypeDto) {
    return 'This action adds a new accessoryType';
  }

  findAll() {
    return `This action returns all accessoryType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessoryType`;
  }

  update(id: number, updateAccessoryTypeDto: UpdateAccessoryTypeDto) {
    return `This action updates a #${id} accessoryType`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessoryType`;
  }
}
