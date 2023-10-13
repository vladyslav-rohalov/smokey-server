import { Module } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { AccessoriesController } from './accessories.controller';
import { Accessory } from './entities/accessory.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [AccessoriesController],
  providers: [AccessoriesService, ProductsService],
  imports: [TypeOrmModule.forFeature([Accessory, Product])],
})
export class AccessoriesModule {}
