import { Module, forwardRef } from '@nestjs/common';
import { HookahsService } from './hookahs.service';
import { HookahsController } from './hookahs.controller';
import { Hookah } from './entities/hookah.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';
import { HookahSizeService } from 'src/enums/hookah-size/hookah-size.service';
import { HookahSize } from 'src/enums/hookah-size/entities/hookah-size.entity';
import { ColorService } from 'src/enums/color/color.service';
import { Color } from 'src/enums/color/entities/color.entity';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';

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
