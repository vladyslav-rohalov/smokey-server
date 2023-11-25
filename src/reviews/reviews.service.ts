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
    const updatedDto = {
      text: createReviewDto.text,
      pros: createReviewDto.pros,
      cons: createReviewDto.cons,
      rating: +createReviewDto.rating,
    };

    const newRaview = this.reviewRepository.create(updatedDto);
    const product: Partial<Product> = { id: id };
    const user: Partial<User> = { id: userId };

    newRaview.product = product as Product;
    newRaview.user = user as User;

    if (images && images.length) {
      const uploaded = await this.s3Service.uploadReviewFiles(images);
      const imagesArr = uploaded.map(file => file?.Key.split('/')[1]);
      newRaview.images = imagesArr;
    }

    const savedReview = await this.reviewRepository.save(newRaview);
    const review = await this.reviewRepository.findOne({
      where: { id: savedReview.id },
      relations: ['user'],
    });

    const averageRating = await this.calculateAverageRating(id);
    const roundedAverageRating = Math.round(averageRating * 10) / 10;
    const updatedProduct = await this.productsService.updateRating(
      id,
      roundedAverageRating,
    );

    const updatedReview = {
      ...review,
      user: {
        firstName: review.user.firstName,
      },
    };

    return { product: updatedProduct, review: updatedReview };
  }

  private async calculateAverageRating(productId: number): Promise<number> {
    const [result] = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'averageRating')
      .where('review.product.id = :productId', { productId })
      .getRawMany();

    return result.averageRating || null;
  }
}
