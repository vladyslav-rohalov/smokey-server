import { Module } from '@nestjs/common';
import { TobaccoService } from './tobacco.service';
import { TobaccoController } from './tobacco.controller';
import { Tobacco } from './entities/tobacco.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TobaccoController],
  providers: [TobaccoService],
  imports: [TypeOrmModule.forFeature([Tobacco, Product])],
})
export class TobaccoModule {}
