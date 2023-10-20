import { Module } from '@nestjs/common';
import { AccessoryTypeService } from './accessory-type.service';
import { AccessoryTypeController } from './accessory-type.controller';

@Module({
  controllers: [AccessoryTypeController],
  providers: [AccessoryTypeService],
})
export class AccessoryTypeModule {}
