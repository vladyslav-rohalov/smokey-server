import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IProductReviews } from 'src/lib/interfaces';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private productsService: ProductsService,
    private s3Service: AwsS3Service,
  ) {}

  async findProductReviews(id: number): Promise<IProductReviews> {
    const productReviews = await this.reviewRepository.find({
      where: {
        product: { id: id },
      },
      relations: ['user'],
    });

    const updatedReviews = productReviews.map(review => ({
      ...review,
      user: {
        firstName: review.user.firstName,
      },
    }));

    const product = await this.productsService.findOne(id);

    return { product, reviews: updatedReviews };
  }

  async addProductReview(
    id: number,
    createReviewDto: CreateReviewDto,
    userId: number,
    images: Express.Multer.File[],
  ) {
    createReviewDto.rating = +createReviewDto.rating;
    const newRaview = this.reviewRepository.create(createReviewDto);
    const product: Partial<Product> = { id: id };
    const user: Partial<User> = { id: userId };
    newRaview.product = product as Product;
    newRaview.user = user as User;
    if (images && images.length) {
      const uploaded = await this.s3Service.uploadReviewFiles(images);
      const imagesArr = uploaded.map(file => file.Location);
      newRaview.images = imagesArr;
    }
    const updatedReview = await this.reviewRepository.save(newRaview);
    return updatedReview;
  }
}
