import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewRatingService } from './review-rating.service';
import { CreateReviewRatingDto } from './dto/create-review-rating.dto';
import { UpdateReviewRatingDto } from './dto/update-review-rating.dto';

@Controller('review-rating')
export class ReviewRatingController {
  constructor(private readonly reviewRatingService: ReviewRatingService) {}

  @Post()
  create(@Body() createReviewRatingDto: CreateReviewRatingDto) {
    return this.reviewRatingService.create(createReviewRatingDto);
  }

  @Get()
  findAll() {
    return this.reviewRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewRatingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewRatingDto: UpdateReviewRatingDto) {
    return this.reviewRatingService.update(+id, updateReviewRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewRatingService.remove(+id);
  }
}
