import { Module } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { AccessoriesController } from './accessories.controller';
import { Accessory } from './entities/accessory.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AccessoriesController],
  providers: [AccessoriesService],
  imports: [TypeOrmModule.forFeature([Accessory, Product])],
})
export class AccessoriesModule {}
