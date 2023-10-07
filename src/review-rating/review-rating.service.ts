import { Injectable } from '@nestjs/common';
import { CreateReviewRatingDto } from './dto/create-review-rating.dto';
import { UpdateReviewRatingDto } from './dto/update-review-rating.dto';

@Injectable()
export class ReviewRatingService {
  create(createReviewRatingDto: CreateReviewRatingDto) {
    return 'This action adds a new reviewRating';
  }

  findAll() {
    return `This action returns all reviewRating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewRating`;
  }

  update(id: number, updateReviewRatingDto: UpdateReviewRatingDto) {
    return `This action updates a #${id} reviewRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewRating`;
  }
}
