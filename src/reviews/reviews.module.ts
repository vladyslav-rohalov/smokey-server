import { Module, forwardRef } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';
import { AwsS3Service } from 'src/services/aws-s3/aws-s3.service';
import { AwsS3Module } from 'src/services/aws-s3/aws-s3.module';
import { BrandModule } from 'src/enums/brand/brand.module';
import { PromotionModule } from 'src/enums/promotion/promotion.module';

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
