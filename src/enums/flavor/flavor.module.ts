import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';

@Module({
  controllers: [FlavorController],
  providers: [FlavorService],
})
export class FlavorModule {}
