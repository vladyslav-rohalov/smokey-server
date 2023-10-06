import { Module } from '@nestjs/common';
import { CoalsService } from './coals.service';
import { CoalsController } from './coals.controller';
import { Coal } from './entities/coal.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CoalsController],
  providers: [CoalsService],
  imports: [TypeOrmModule.forFeature([Coal, Product])],
})
export class CoalsModule {}
