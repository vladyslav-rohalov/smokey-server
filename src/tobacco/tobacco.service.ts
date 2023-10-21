import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Tobacco } from './entities/tobacco.entity';
import { CreateTobaccoDto } from './dto/create-tobacco.dto';
import { UpdateTobaccoDto } from './dto/update-tobacco.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductsService } from 'src/products/products.service';
import { ISearchTobacco } from 'src/lib/interfaces';
import { sortProductsByPrice, Pagination } from 'src/lib/functions';
import { paramToArr } from 'src/lib/functions';

@Injectable()
export class TobaccoService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Tobacco) private tobaccoRepository: Repository<Tobacco>,
    private productService: ProductsService,
  ) {}

  async createTobacco(createTobaccoDto: CreateTobaccoDto) {
    const tobacco = this.tobaccoRepository.create(createTobaccoDto);
    return await this.tobaccoRepository.save(tobacco);
  }

  async updateTobacco(tobaccoId: number, updateTobaccoDto: UpdateTobaccoDto) {
    const tobacco = await this.tobaccoRepository.findOne({
      where: { id: tobaccoId },
    });

    if (!tobacco) {
      throw new NotFoundException(`product with id ${tobaccoId} not found`);
    }

    const dto = {
      flavor: updateTobaccoDto.flavor || tobacco.flavor,
      weight: updateTobaccoDto.tobacco_weight || tobacco.tobacco_weight,
      strength: updateTobaccoDto.strength || tobacco.strength,
    };

    await this.tobaccoRepository.update(tobaccoId, dto);
    return await this.tobaccoRepository.findOne({ where: { id: tobaccoId } });
  }

  // async createProductWithTobacco(
  //   createProductDto: CreateProductDto,
  //   createTobaccoDto: CreateTobaccoDto,
  // ) {
  //   const product = await this.productService.createProduct(createProductDto);
  //   const tobacco = await this.createTobacco(createTobaccoDto);

  //   product.tobacco = tobacco;
  //   await this.productRepository.save(product);

  //   return product;
  // }

  // async updateProductWithTobacco(
  //   productId: number,
  //   updateProductDto: UpdateProductDto,
  //   updateTobaccoDto: UpdateTobaccoDto,
  // ) {
  //   const updatedProduct = await this.productService.updateProduct(
  //     productId,
  //     updateProductDto,
  //   );

  //   const updatedTobacco = await this.updateTobacco(
  //     updatedProduct.tobacco.id,
  //     updateTobaccoDto,
  //   );

  //   updatedProduct.tobacco = updatedTobacco;
  //   await this.productRepository.save(updatedProduct);

  //   return updatedProduct;
  // }

  async findAllTobacco(params: ISearchTobacco) {
    const {
      page,
      limit,
      sort,
      brand,
      status,
      flavor,
      weight,
      strength,
      min,
      max,
    } = params;

    // const brandsArr = await paramToArr(brand);
    const weightsArr = await paramToArr(weight);
    // const flavorsArr = await paramToArr(flavor);

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.tobacco', 'tobacco');

    if (status) {
      query = query.andWhere('product.status = :status', { status });
    }

    // if (brandsArr && brandsArr.length > 0) {
    //   query = query.andWhere('LOWER(product.brand) IN (:...brandsArr)', {
    //     brandsArr: brandsArr.map(brand => brand.toLowerCase()),
    //   });
    // }
    // if (flavorsArr && flavorsArr.length > 0) {
    //   query = query.andWhere('LOWER(tobacco.flavor) IN (:...flavorsArr)', {
    //     flavorsArr: flavorsArr.map(flavor => flavor.toLocaleLowerCase()),
    //   });
    // }
    if (weightsArr && weightsArr.length > 0) {
      query = query.andWhere('(tobacco.tobacco_weight) IN (:...weightsArr)', {
        weightsArr: weightsArr.map(weight => +weight),
      });
    }
    if (strength) {
      query = query.andWhere('tobacco.strength = :strength', { strength });
    }
    if (sort) {
      if (sort === 'new' || sort === 'sale' || sort === 'hot') {
        query = query.andWhere('product.promotion = :sort', { sort });
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
    // const brandCounts: { [key: string]: number } = {};
    // const flavorCounts: { [key: string]: number } = {};
    const weightCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};
    const prices = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
    if (products.length <= 0) {
      prices.min = 0;
      prices.max = 0;
    }
    products.forEach(product => {
      // const brand = product.brand.toLowerCase();
      // const flavor = product.tobacco.flavor.toLowerCase();
      const weight = product.tobacco.tobacco_weight;
      const status = product.status.toLocaleLowerCase();
      const price = +product.price;

      if (price < prices.min) {
        prices.min = price;
      }
      if (price > prices.max) {
        prices.max = price;
      }
      // if (!brandCounts[brand]) {
      //   brandCounts[brand] = 0;
      // }
      // brandCounts[brand]++;

      if (!statusCounts[status]) {
        statusCounts[status] = 0;
      }
      statusCounts[status]++;

      // if (!flavorCounts[flavor]) {
      //   flavorCounts[flavor] = 0;
      // }
      // flavorCounts[flavor]++;

      if (!weightCounts[weight]) {
        weightCounts[weight] = 0;
      }
      weightCounts[weight]++;
    });

    const sortedProducts = await sortProductsByPrice(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);

    return {
      products: paginatedProducts,
      counts: {
        total,
        // brandCounts,
        // flavorCounts,
        weightCounts,
        statusCounts,
        prices,
      },
    };
  }
}
