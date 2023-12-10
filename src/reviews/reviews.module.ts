import { Module, forwardRef } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BlacklistedTokensModule } from '../blacklisted-tokens/blacklisted-tokens.module';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { AwsS3Module } from '../services/aws-s3/aws-s3.module';
import { BrandModule } from '../enums/brand/brand.module';
import { PromotionModule } from '../enums/promotion/promotion.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ProductsService, AwsS3Service],
  imports: [
    TypeOrmModule.forFeature([Review, User, Product, AwsS3Module]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
    ProductsModule,
    BrandModule,
    PromotionModule,
  ],
})
export class ReviewsModule {}
