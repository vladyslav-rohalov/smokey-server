import { Module } from '@nestjs/common';
import { HookahSizeService } from './hookah-size.service';
import { HookahSizeController } from './hookah-size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HookahSize } from './entities/hookah-size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HookahSize])],
  controllers: [HookahSizeController],
  providers: [HookahSizeService],
})
export class HookahSizeModule {}
