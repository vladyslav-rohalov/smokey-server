import { Module, forwardRef } from '@nestjs/common';
import { TobaccoService } from './tobacco.service';
import { TobaccoController } from './tobacco.controller';
import { Tobacco } from './entities/tobacco.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { FlavorService } from '../enums/flavor/flavor.service';
import { BrandModule } from '../enums/brand/brand.module';
import { PromotionModule } from '../enums/promotion/promotion.module';
import { Flavor } from '../enums/flavor/entities/flavor.entity';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [TobaccoController],
  providers: [TobaccoService, ProductsService, FlavorService, AwsS3Service],
  imports: [
    TypeOrmModule.forFeature([Tobacco, Product, Flavor, JwtModule]),
    BrandModule,
    PromotionModule,
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
})
export class TobaccoModule {}
