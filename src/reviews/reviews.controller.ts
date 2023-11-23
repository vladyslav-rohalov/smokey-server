import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { UseGuards, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

interface IRequest extends Request {
  user: { id: number };
}

@Controller('api/products/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':id')
  findProductReviews(@Param('id') id: string) {
    return this.reviewsService.findProductReviews(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @UseInterceptors(FilesInterceptor('images'))
  addProductReviews(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: IRequest,
  ) {
    const userId = req.user.id;
    return this.reviewsService.addProductReview(+id, createReviewDto, userId);
  }
}
