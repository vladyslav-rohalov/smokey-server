import { Module } from '@nestjs/common';
import { BowlTypeService } from './bowl-type.service';
import { BowlTypeController } from './bowl-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BowlType } from './entities/bowl-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BowlType])],
  controllers: [BowlTypeController],
  providers: [BowlTypeService],
})
export class BowlTypeModule {}
