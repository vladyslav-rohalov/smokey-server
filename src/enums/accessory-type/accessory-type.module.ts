import { Module } from '@nestjs/common';
import { AccessoryTypeService } from './accessory-type.service';
import { AccessoryTypeController } from './accessory-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoryType } from './entities/accessory-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessoryType])],
  controllers: [AccessoryTypeController],
  providers: [AccessoryTypeService],
})
export class AccessoryTypeModule {}
