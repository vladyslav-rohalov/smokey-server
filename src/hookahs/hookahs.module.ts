import { Module, forwardRef } from '@nestjs/common';
import { HookahsService } from './hookahs.service';
import { HookahsController } from './hookahs.controller';
import { Hookah } from './entities/hookah.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { BrandModule } from '../enums/brand/brand.module';
import { PromotionModule } from '../enums/promotion/promotion.module';
import { HookahSizeService } from '../enums/hookah-size/hookah-size.service';
import { HookahSize } from '../enums/hookah-size/entities/hookah-size.entity';
import { ColorService } from '../enums/color/color.service';
import { Color } from '../enums/color/entities/color.entity';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [HookahsController],
  providers: [
    HookahsService,
    ProductsService,
    HookahSizeService,
    ColorService,
    AwsS3Service,
  ],
  imports: [
    TypeOrmModule.forFeature([Hookah, Product, HookahSize, Color, JwtModule]),
    BrandModule,
    PromotionModule,
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
})
export class HookahsModule {}
