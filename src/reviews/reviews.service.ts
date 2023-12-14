import { Injectable } from '@nestjs/common';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IProductReviews } from '../lib/interfaces';
import { Express } from 'express';
import { Multer } from 'multer';

type File = Express.Multer.File;

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private productsService: ProductsService,
    private s3Service: AwsS3Service,
  ) {}

  async findUserReviews(userId: number) {
    const reviews = await this.reviewRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });

    const updatedReviews = reviews.map(review => ({
      ...review,
      user: {
        firstName: review.user.firstName,
      },
    }));
    return updatedReviews;
  }

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
    // images: Express.Multer.File[],
    images: File[],
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

    const updatedProduct = await this.updateProductRating(id);

    const updatedReview = {
      ...review,
      user: {
        firstName: review.user.firstName,
      },
    };

    return { product: updatedProduct, review: updatedReview };
  }

  async deleteProductReview(reviewId: number, userId: number) {
    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
      relations: ['user', 'product'],
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${reviewId} wasn't found`);
    }

    if (review.user.id !== userId) {
      throw new ForbiddenException();
    }

    if (review.product.images) {
      await this.s3Service.deleteImages(review.images, 'reviews');
    }
    await this.reviewRepository.remove(review);

    await this.updateProductRating(review.product.id);
  }

  async updateProductReview(
    id: number,
    updateReviewDto: UpdateReviewDto,
    userId: number,
    // images: Express.Multer.File[],
    images: File[],
  ) {
    const updatedDto = {
      text: updateReviewDto.text,
      pros: updateReviewDto.pros,
      cons: updateReviewDto.cons,
      rating: +updateReviewDto.rating,
    };
    const review = await this.reviewRepository.findOne({
      where: { id: id, user: { id: userId } },
      relations: ['user', 'product'],
    });
    if (!review) {
      throw new NotFoundException();
    }

    const updatedReview = {
      ...review,
      ...updatedDto,
      user: {
        firstName: review.user.firstName,
      },
    };

    if (!Array.isArray(updatedReview.images)) {
      updatedReview.images = [];
    }

    const reqImageNames = images.map(img => img.originalname);

    const imagesToDelete = updatedReview.images.filter(
      img => !reqImageNames.includes(img),
    );
    if (imagesToDelete.length) {
      await this.s3Service.deleteImages(imagesToDelete, 'reviews');
      updatedReview.images = updatedReview.images.filter(
        img => !imagesToDelete.includes(img),
      );
    }

    const imagesToAdd = images.filter(
      img => !updatedReview.images.includes(img.originalname),
    );
    if (imagesToAdd.length) {
      const uploaded = await this.s3Service.uploadReviewFiles(imagesToAdd);
      const imagesArr = uploaded.map(file => file?.Key.split('/')[1]);

      updatedReview.images = [...updatedReview.images, ...imagesArr];
    }

    await this.reviewRepository.save(updatedReview);

    const updatedProduct = await this.updateProductRating(review.product.id);

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

  private async updateProductRating(productId: number) {
    const averageRating = await this.calculateAverageRating(productId);
    const roundedAverageRating =
      averageRating === null ? null : Math.round(averageRating * 10) / 10;

    return await this.productsService.updateRating(
      productId,
      roundedAverageRating,
    );
  }
}
