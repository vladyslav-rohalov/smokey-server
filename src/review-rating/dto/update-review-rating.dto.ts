import { PartialType } from '@nestjs/swagger';
import { CreateReviewRatingDto } from './create-review-rating.dto';

export class UpdateReviewRatingDto extends PartialType(CreateReviewRatingDto) {}
