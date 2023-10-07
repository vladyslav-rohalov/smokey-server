import { Module } from '@nestjs/common';
import { ReviewRatingService } from './review-rating.service';
import { ReviewRatingController } from './review-rating.controller';
import { ReviewRating } from './entities/review-rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReviewRatingController],
  providers: [ReviewRatingService],
  imports: [TypeOrmModule.forFeature([Review, ReviewRating, User])],
})
export class ReviewRatingModule {}
