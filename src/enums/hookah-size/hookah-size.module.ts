import { Module } from '@nestjs/common';
import { HookahSizeService } from './hookah-size.service';
import { HookahSizeController } from './hookah-size.controller';

@Module({
  controllers: [HookahSizeController],
  providers: [HookahSizeService],
})
export class HookahSizeModule {}
