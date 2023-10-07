import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { ReviewRating } from 'src/review-rating/entities/review-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [
    TypeOrmModule.forFeature([Review, User, Product, Comment, ReviewRating]),
  ],
})
export class ReviewsModule {}
