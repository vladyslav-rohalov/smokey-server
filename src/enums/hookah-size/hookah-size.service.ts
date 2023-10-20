import { Injectable } from '@nestjs/common';
import { CreateHookahSizeDto } from './dto/create-hookah-size.dto';
import { UpdateHookahSizeDto } from './dto/update-hookah-size.dto';

@Injectable()
export class HookahSizeService {
  create(createHookahSizeDto: CreateHookahSizeDto) {
    return 'This action adds a new hookahSize';
  }

  findAll() {
    return `This action returns all hookahSize`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hookahSize`;
  }

  update(id: number, updateHookahSizeDto: UpdateHookahSizeDto) {
    return `This action updates a #${id} hookahSize`;
  }

  remove(id: number) {
    return `This action removes a #${id} hookahSize`;
  }
}
