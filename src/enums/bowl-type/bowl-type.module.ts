import { Module } from '@nestjs/common';
import { BowlTypeService } from './bowl-type.service';
import { BowlTypeController } from './bowl-type.controller';

@Module({
  controllers: [BowlTypeController],
  providers: [BowlTypeService],
})
export class BowlTypeModule {}
