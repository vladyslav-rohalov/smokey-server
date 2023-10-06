import { Module } from '@nestjs/common';
import { HookahsService } from './hookahs.service';
import { HookahsController } from './hookahs.controller';
import { Hookah } from './entities/hookah.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [HookahsController],
  providers: [HookahsService],
  imports: [TypeOrmModule.forFeature([Hookah, Product])],
})
export class HookahsModule {}
