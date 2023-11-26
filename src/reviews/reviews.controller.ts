import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UploadedFiles, UseInterceptors, Patch } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { UseGuards, Req, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IProductReviews, IUserRequest } from 'src/lib/interfaces';

@Controller('api/products/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findUserReviews(@Req() req: IUserRequest) {
    const userId = req.user.id;
    return this.reviewsService.findUserReviews(userId);
  }

  @Get(':id')
  findProductReviews(@Param('id') id: string): Promise<IProductReviews> {
    return this.reviewsService.findProductReviews(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @UseInterceptors(FilesInterceptor('images'))
  addProductReviews(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: IUserRequest,
  ) {
    const userId = req.user.id;
    return this.reviewsService.addProductReview(
      +id,
      createReviewDto,
      userId,
      images,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteProductReview(@Param('id') id: string, @Req() req: IUserRequest) {
    const userId = req.user.id;
    return this.reviewsService.deleteProductReview(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  editProductReview(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req: IUserRequest,
  ) {
    const userId = req.user.id;
    return this.reviewsService.updateProductReview(
      +id,
      updateReviewDto,
      userId,
      images,
    );
  }
}
