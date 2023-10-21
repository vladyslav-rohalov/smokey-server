import { Controller, Get } from '@nestjs/common';
import { EnumsService } from './enums.service';

@Controller('enums')
export class EnumsController {
  constructor(private readonly enumsService: EnumsService) {}

  @Get()
  findAll() {
    return this.enumsService.findAll();
  }
}
