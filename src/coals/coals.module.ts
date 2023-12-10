import { Module, forwardRef } from '@nestjs/common';
import { CoalsService } from './coals.service';
import { CoalsController } from './coals.controller';
import { Coal } from './entities/coal.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { BrandModule } from '../enums/brand/brand.module';
import { PromotionModule } from '../enums/promotion/promotion.module';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [CoalsController],
  providers: [CoalsService, ProductsService, AwsS3Service],
  imports: [
    TypeOrmModule.forFeature([Coal, Product, JwtModule]),
    BrandModule,
    PromotionModule,
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
})
export class CoalsModule {}
