import { Module } from '@nestjs/common';
import { TobaccoService } from './tobacco.service';
import { TobaccoController } from './tobacco.controller';
import { Tobacco } from './entities/tobacco.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [TobaccoController],
  providers: [TobaccoService, ProductsService],
  imports: [TypeOrmModule.forFeature([Tobacco, Product])],
})
export class TobaccoModule {}
