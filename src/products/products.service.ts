import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { BrandService } from '../enums/brand/brand.service';
import { PromotionService } from '../enums/promotion/promotion.service';
import { AwsS3Service } from '../services/aws-s3/aws-s3.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCartDto } from '../cart/dto/create-cart.dto';
import { ISearch, IOptionsUpload, IProducts } from '../lib/interfaces';
import { IProductWithReviews } from '../lib/interfaces';
import { Pagination, sortProducts } from '../lib/functions';
import { Express } from 'express';
import { Multer } from 'multer';

type File = Express.Multer.File;

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandService: BrandService,
    private promotionService: PromotionService,
    private s3Service: AwsS3Service,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const brand = await this.brandService.getBrand(createProductDto.brand);

    const promotion = await this.promotionService.getPromotion(
      createProductDto.promotion,
    );
    const product = this.productRepository.create({
      ...createProductDto,
      brand: brand,
      promotion: promotion,
    });
    return await this.productRepository.save(product);
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    const brand = await this.brandService.getBrand(updateProductDto.brand);

    const promotion = await this.promotionService.getPromotion(
      updateProductDto.promotion,
    );

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    const dto = {
      promotion: promotion,
      status: updateProductDto.status,
      price: updateProductDto.price,
      description: updateProductDto.description,
      brand: brand,
      title: updateProductDto.title,
      available: updateProductDto.available,
      publish: updateProductDto.publish,
    };

    await this.productRepository.update(productId, dto);

    return await this.productRepository.findOne({
      where: { id: productId },
      relations: [
        'tobacco',
        'hookahs',
        'coals',
        'accessories',
        'brand',
        'promotion',
      ],
    });
  }

  async findAll(params: Partial<ISearch>): Promise<IProducts> {
    let { page, limit, sort, id, images, publish } = params;
    let { brand, status, min, max, promotion } = params;

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .leftJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('product.tobacco', 'tobacco')
      .leftJoinAndSelect('product.coals', 'coals')
      .leftJoinAndSelect('product.accessories', 'accessories')
      .leftJoinAndSelect('tobacco.flavor', 'flavor')
      .leftJoinAndSelect('hookahs.color', 'color')
      .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
      .leftJoinAndSelect('accessories.type', 'type')
      .leftJoinAndSelect('accessories.bowl_type', 'bowl_type');

    if (status) {
      query = query.andWhere('product.status = :status', { status });
    }
    if (id) {
      query = query.andWhere('product.id = :id', { id });
    }
    if (publish === true || publish === false) {
      query = query.andWhere('product.publish = :publish', { publish });
    }
    if (images === true || images === false) {
      if (images === true) {
        query = query.andWhere('product.images IS NOT NULL');
      } else if (images === false) {
        query = query.andWhere('product.images IS NULL');
      }
    }
    if (brand) {
      query = query.andWhere('LOWER(brand.brand) = :brand', {
        brand: brand.toLowerCase(),
      });
    }
    if (promotion) {
      query = query.andWhere('LOWER(promotion.promotion) = :promotion', {
        promotion: promotion.toLowerCase(),
      });
    }
    if (min && max) {
      query = query.andWhere('product.price BETWEEN :min AND :max', {
        min,
        max,
      });
    } else if (min) {
      query = query.andWhere('product.price >= :min', { min });
    } else if (max) {
      query = query.andWhere('product.price <= :max', { max });
    }

    const products = await query.getMany();

    const total = products.length;
    const sortedProducts = await sortProducts(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);
    const updatedProducts = paginatedProducts.map(product => {
      const { reviews, ...rest } = product;
      const numberOfReviews = Array.isArray(reviews) ? reviews.length : 0;
      return { ...rest, numberOfReviews };
    });
    return {
      counts: {
        total,
      },
      products: updatedProducts,
    };
  }

  async findOne(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['tobacco', 'hookahs', 'coals', 'accessories', 'reviews'],
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    let response = null;
    if (product.accessories) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: [
          'accessories',
          'accessories.type',
          'accessories.bowl_type',
          'brand',
          'promotion',
        ],
      });
    }
    if (product.tobacco) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['tobacco', 'tobacco.flavor', 'brand', 'promotion'],
      });
    }
    if (product.coals) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['coals', 'brand', 'promotion'],
      });
    }
    if (product.hookahs) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: [
          'hookahs',
          'hookahs.hookah_size',
          'hookahs.color',
          'brand',
          'promotion',
        ],
      });
    }
    if (product.reviews) {
      const numberOfReviews = Array.isArray(product.reviews)
        ? product.reviews.length
        : 0;
      response = { ...response, numberOfReviews };
    }
    return response;
  }

  async findRelatedById(productId: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('product.tobacco', 'tobacco')
      .leftJoinAndSelect('product.coals', 'coals')
      .leftJoinAndSelect('product.accessories', 'accessories')
      .leftJoinAndSelect('tobacco.flavor', 'flavor')
      .leftJoinAndSelect('hookahs.color', 'color')
      .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
      .leftJoinAndSelect('accessories.type', 'type')
      .leftJoinAndSelect('accessories.bowl_type', 'bowl_type')
      .andWhere('product.id = :productId', { productId })
      .getOne();

    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    let response = null;

    if (product.accessories) {
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.reviews', 'reviews')
        .leftJoinAndSelect('product.accessories', 'accessories')
        .leftJoinAndSelect('accessories.type', 'type')
        .leftJoinAndSelect('accessories.bowl_type', 'bowl_type')
        .andWhere('accessories.type = :type_id', {
          type_id: product.accessories.type.id,
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
    }
    if (product.tobacco) {
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.reviews', 'reviews')
        .leftJoinAndSelect('product.tobacco', 'tobacco')
        .leftJoinAndSelect('tobacco.flavor', 'flavor')
        .andWhere('product.brand = :brand_id', {
          brand_id: product.brand.id,
        })
        .andWhere('tobacco.tobacco_weight = :weight', {
          weight: product.tobacco.tobacco_weight,
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
    }
    if (product.coals) {
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.coals', 'coals')
        .leftJoinAndSelect('product.reviews', 'reviews')
        .andWhere('coals.coal_size = :coal_size', {
          coal_size: product.coals.coal_size,
        })
        .andWhere('coals.coal_weight = :weight', {
          weight: product.coals.coal_weight,
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
    }
    const priceThreshold = 0.2;
    if (product.hookahs) {
      const basePrice = product.price;
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.reviews', 'reviews')
        .leftJoinAndSelect('product.hookahs', 'hookahs')
        .leftJoinAndSelect('hookahs.color', 'color')
        .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
        .where('hookahs.id IS NOT NULL')
        .andWhere('product.price >= :minPrice', {
          minPrice: basePrice * (1 - priceThreshold),
        })
        .andWhere('product.price <= :maxPrice', {
          maxPrice: basePrice * (1 + priceThreshold),
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
    }
    const updatedProducts = response.map(product => {
      const { reviews, ...rest } = product;
      const numberOfReviews = Array.isArray(reviews) ? reviews.length : 0;
      return { ...rest, numberOfReviews };
    });
    return updatedProducts;
  }

  async remove(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }

    if (product.images !== null) {
      await this.s3Service.deleteImages(product.images, 'products');
    }

    await this.productRepository.remove(product);
  }

  async findAllPromotion(): Promise<IProductWithReviews[]> {
    const promoted = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .leftJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('product.tobacco', 'tobacco')
      .leftJoinAndSelect('product.coals', 'coals')
      .leftJoinAndSelect('product.accessories', 'accessories')
      .leftJoinAndSelect('tobacco.flavor', 'flavor')
      .leftJoinAndSelect('hookahs.color', 'color')
      .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
      .leftJoinAndSelect('accessories.type', 'type')
      .leftJoinAndSelect('accessories.bowl_type', 'bowl_type')
      .where('promotion.promotion IN (:...values)', {
        values: ['hot', 'sale', 'new'],
      })
      .andWhere('product.publish = :publish', { publish: true })
      .getMany();

    const updatedProducts = promoted.map(product => {
      const { reviews, ...rest } = product;
      const numberOfReviews = Array.isArray(reviews) ? reviews.length : 0;
      return { ...rest, numberOfReviews };
    });
    return updatedProducts;
  }

  async addImages(
    productId: number,
    // images: Express.Multer.File[],
    images: File[],
    options: IOptionsUpload,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    const uploaded = await this.s3Service.uploadFiles(images, options);
    // const imagesArr = uploaded.map(file => file.Location);
    const imagesArr = uploaded.map(file => file?.Key.split('/')[1]);
    const updatedImages = product.images
      ? [...product.images, ...imagesArr]
      : imagesArr;
    await this.productRepository.update(productId, { images: updatedImages });

    return await this.findOne(productId);
  }

  async removeImages(productId: number, images: string[]) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    const filtredImages = product.images.filter(
      image => !images.includes(image),
    );
    const updatedImages = filtredImages.length ? filtredImages : null;
    await this.s3Service.deleteImages(images, 'products');
    await this.productRepository.update(productId, { images: updatedImages });

    return await this.findOne(productId);
  }

  async publish(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    await this.productRepository.update(productId, {
      publish: !product.publish,
    });

    return await this.findOne(productId);
  }

  async findCart(createCartDto: CreateCartDto): Promise<Product[]> {
    const productIds = createCartDto.items.map(item => item.productId);

    const products = await this.productRepository.findBy({
      id: In(productIds),
    });

    return products.map(product => {
      const item = createCartDto.items.find(
        item => item.productId === product.id,
      );
      const quantity =
        item.quantity > product.available ? product.available : item.quantity;
      return item ? { ...product, quantity } : product;
    });
  }

  async getTabs() {
    const response = await this.findAll({ limit: 10000 });
    const hookahBrands = [];
    const hookahColors = [];
    const hookahSizes = [];
    const tobaccoBrands = [];
    const tobaccoFlavors = [];
    const tobaccoWeights = [];
    const coalBrands = [];
    const coalSizes = [];
    const coalWeights = [];
    const accessoryBrands = [];
    const accessoryTypes = [];

    response.products.forEach(product => {
      const { brand, hookahs, tobacco, coals, accessories } = product;

      if (hookahs) {
        hookahBrands.push(brand.brand);
        hookahColors.push(hookahs.color.color);
        hookahSizes.push(hookahs.hookah_size.hookah_size);
      } else if (tobacco) {
        tobaccoBrands.push(brand.brand);
        tobaccoFlavors.push(tobacco.flavor.flavor);
        tobaccoWeights.push(tobacco.tobacco_weight);
      } else if (coals) {
        coalBrands.push(brand.brand);
        coalSizes.push(coals.coal_size);
        coalWeights.push(coals.coal_weight);
      } else if (accessories) {
        accessoryBrands.push(brand.brand);
        accessoryTypes.push(accessories.type.type);
      }
    });

    const productTabs = [
      {
        name: 'hookahs',
        brands: Array.from(new Set(hookahBrands)),
        colors: Array.from(new Set(hookahColors)),
        hookahSizes: Array.from(new Set(hookahSizes)),
      },
      {
        name: 'tobacco',
        brands: Array.from(new Set(tobaccoBrands)),
        flavors: Array.from(new Set(tobaccoFlavors)),
        tobaccoWeights: Array.from(new Set(tobaccoWeights)),
      },
      {
        name: 'coals',
        brands: Array.from(new Set(coalBrands)),
        coalSizes: Array.from(new Set(coalSizes)),
        coalWeights: Array.from(new Set(coalWeights)),
      },
      {
        name: 'accessories',
        brands: Array.from(new Set(accessoryBrands)),
        types: Array.from(new Set(accessoryTypes)),
      },
    ];

    return productTabs;
  }

  async getSuggestion(search: string) {
    const response = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('product.tobacco', 'tobacco')
      .leftJoinAndSelect('product.coals', 'coals')
      .leftJoinAndSelect('product.accessories', 'accessories')
      .getMany();

    const searchWords = search.toLowerCase().split(/\s+/);
    const filteredProducts = response.filter(product => {
      const productTitle = product.title.toLowerCase();
      return searchWords.every(word => productTitle.includes(word));
    });

    const mappedProducts = filteredProducts.map(product => {
      let category;
      if (product.hookahs !== null) category = 'hookahs';
      if (product.tobacco !== null) category = 'tobacco';
      if (product.coals !== null) category = 'coals';
      if (product.accessories !== null) category = 'accessories';
      return { id: product.id, title: product.title, category };
    });

    const slicedProducts = mappedProducts.slice(0, 9);

    return slicedProducts;
  }

  async updateRating(productId: number, rating: number) {
    await this.productRepository.update(productId, { rating });
    return await this.findOne(productId);
  }
}
