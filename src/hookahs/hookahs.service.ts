import { Injectable } from '@nestjs/common';
import { CreateHookahDto } from './dto/create-hookah.dto';
import { UpdateHookahDto } from './dto/update-hookah.dto';

@Injectable()
export class HookahsService {
  create(createHookahDto: CreateHookahDto) {
    return 'This action adds a new hookah';
  }

  findAll() {
    return `This action returns all hookahs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hookah`;
  }

  update(id: number, updateHookahDto: UpdateHookahDto) {
    return `This action updates a #${id} hookah`;
  }

  remove(id: number) {
    return `This action removes a #${id} hookah`;
  }
}
