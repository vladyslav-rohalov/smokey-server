import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Tobacco } from './entities/tobacco.entity';
import { CreateTobaccoDto } from './dto/create-tobacco.dto';
import { UpdateTobaccoDto } from './dto/update-tobacco.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { ProductsService } from '../products/products.service';
import { FlavorService } from '../enums/flavor/flavor.service';
import { ISearchTobacco, ITobaccoProducts } from '../lib/interfaces';
import { sortProducts, Pagination } from '../lib/functions';
import { paramToArr } from '../lib/functions';

@Injectable()
export class TobaccoService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Tobacco) private tobaccoRepository: Repository<Tobacco>,
    private productService: ProductsService,
    private flavorService: FlavorService,
  ) {}

  async createTobacco(createTobaccoDto: CreateTobaccoDto) {
    const flavor = await this.flavorService.getFlavor(createTobaccoDto.flavor);
    const tobacco = this.tobaccoRepository.create({
      ...createTobaccoDto,
      flavor,
    });
    return await this.tobaccoRepository.save(tobacco);
  }

  async createProductWithTobacco(
    createProductDto: CreateProductDto,
    createTobaccoDto: CreateTobaccoDto,
  ) {
    const product = await this.productService.createProduct(createProductDto);
    const tobacco = await this.createTobacco(createTobaccoDto);

    product.tobacco = tobacco;
    await this.productRepository.save(product);

    return product;
  }

  async updateTobacco(tobaccoId: number, updateTobaccoDto: UpdateTobaccoDto) {
    const flavor = await this.flavorService.getFlavor(updateTobaccoDto.flavor);
    const tobacco = await this.tobaccoRepository.findOne({
      where: { id: tobaccoId },
    });

    if (!tobacco) {
      throw new NotFoundException(`product with id ${tobaccoId} not found`);
    }

    const dto = {
      flavor: flavor,
      tobacco_weight: updateTobaccoDto.tobacco_weight,
      strength: updateTobaccoDto.strength,
    };

    await this.tobaccoRepository.update(tobaccoId, dto);
    return await this.tobaccoRepository.findOne({
      where: { id: tobaccoId },
      relations: ['flavor'],
    });
  }

  async updateProductWithTobacco(
    productId: number,
    updateProductDto: UpdateProductDto,
    updateTobaccoDto: UpdateTobaccoDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    const updatedTobacco = await this.updateTobacco(
      updatedProduct.tobacco.id,
      updateTobaccoDto,
    );

    updatedProduct.tobacco = updatedTobacco;
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async findAllTobacco(params: ISearchTobacco): Promise<ITobaccoProducts> {
    const { page, limit, sort, brand, status, flavor, weight } = params;
    const { id, images, publish, promotion, min, max, strength } = params;

    const brandsArr = await paramToArr(brand);
    const weightsArr = await paramToArr(weight);

    const flavorsArr = await paramToArr(flavor);

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.tobacco', 'tobacco')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .leftJoinAndSelect('tobacco.flavor', 'flavor');

    if (id) {
      query = query.andWhere('product.id = :id', { id });
    }

    if (publish) {
      query = query.andWhere('product.publish = :publish', { publish });
    }

    if (images) {
      if (images === true) {
        query = query.andWhere('product.images IS NOT NULL');
      } else if (images === false) {
        query = query.andWhere('product.images IS NULL');
      }
    }

    if (promotion) {
      query = query.andWhere('LOWER(promotion.promotion) = :promotion', {
        promotion: promotion.toLowerCase(),
      });
    }

    if (status) {
      query = query.andWhere('product.status = :status', { status });
    }

    if (brandsArr && brandsArr.length > 0) {
      query = query.andWhere(
        'product.brand_id IN (SELECT brand_id FROM brand WHERE LOWER(brand) IN (:...brandsArr))',
        {
          brandsArr: brandsArr.map(brand => brand.toLowerCase()),
        },
      );
    }

    if (flavorsArr && flavorsArr.length > 0) {
      query = query.andWhere(
        'tobacco.flavor IN (SELECT flavor_id FROM flavor WHERE LOWER(flavor) IN (:...flavorsArr))',
        {
          flavorsArr: flavorsArr.map(flavor => flavor.toLocaleLowerCase()),
        },
      );
    }

    if (weightsArr && weightsArr.length > 0) {
      query = query.andWhere('(tobacco.tobacco_weight) IN (:...weightsArr)', {
        weightsArr: weightsArr.map(weight => +weight),
      });
    }

    if (strength) {
      if (strength === 'none') {
        query = query.andWhere('tobacco.strength IS NULL');
      } else {
        query = query.andWhere('tobacco.strength = :strength', { strength });
      }
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
    const brandCounts: { [key: string]: number } = {};
    const flavorCounts: { [key: string]: number } = {};
    const weightCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};
    const prices = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
    if (products.length <= 0) {
      prices.min = 0;
      prices.max = 0;
    }

    const categoryProducts = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.tobacco', 'tobacco')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('tobacco.flavor', 'flavor')
      .getMany();

    categoryProducts.forEach(product => {
      const brand = product.brand.brand.toLowerCase();
      const flavor = product.tobacco.flavor.flavor.toLowerCase();
      const weight = product.tobacco.tobacco_weight;
      const status = product.status.toLocaleLowerCase();
      const price = +product.price;

      if (price < prices.min) {
        prices.min = price;
      }
      if (price > prices.max) {
        prices.max = price;
      }
      if (!brandCounts[brand]) {
        brandCounts[brand] = 0;
      }
      brandCounts[brand]++;

      if (!statusCounts[status]) {
        statusCounts[status] = 0;
      }
      statusCounts[status]++;

      if (!flavorCounts[flavor]) {
        flavorCounts[flavor] = 0;
      }
      flavorCounts[flavor]++;

      if (!weightCounts[weight]) {
        weightCounts[weight] = 0;
      }
      weightCounts[weight]++;
    });

    const sortedProducts = await sortProducts(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);
    const updatedProducts = paginatedProducts.map(product => {
      const { reviews, ...rest } = product;
      const numberOfReviews = Array.isArray(reviews) ? reviews.length : 0;
      return { ...rest, numberOfReviews };
    });
    return {
      products: updatedProducts,
      counts: {
        total,
        brandCounts,
        flavorCounts,
        weightCounts,
        statusCounts,
        prices,
      },
    };
  }
}
