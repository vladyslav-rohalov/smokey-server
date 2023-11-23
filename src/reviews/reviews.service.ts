import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async findProductReviews(id: number): Promise<Omit<Review, 'user'>[]> {
    const productReviews = await this.reviewRepository.find({
      where: {
        product: { id: id },
      },
      relations: ['product', 'user'],
    });
    const updatedReviews = productReviews.map(review => ({
      ...review,
      user: {
        firstName: review.user.firstName,
      },
    }));
    return updatedReviews;
  }

  async addProductReview(
    id: number,
    createReviewDto: CreateReviewDto,
    userId: number,
  ) {
    createReviewDto.rating = +createReviewDto.rating;
    const newRaview = this.reviewRepository.create(createReviewDto);
    const product: Partial<Product> = { id: id };
    const user: Partial<User> = { id: userId };
    newRaview.product = product as Product;
    newRaview.user = user as User;

    const updatedReview = await this.reviewRepository.save(newRaview);
    return updatedReview;
  }
}
