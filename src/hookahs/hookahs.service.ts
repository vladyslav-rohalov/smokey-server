import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHookahDto } from './dto/create-hookah.dto';
import { UpdateHookahDto } from './dto/update-hookah.dto';
import { Product } from 'src/products/entities/product.entity';
import { Hookah } from './entities/hookah.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductsService } from 'src/products/products.service';
import { ISearchHookahs } from 'src/lib/interfaces';
import { sortProductsByPrice, Pagination } from 'src/lib/functions';
import { paramToArr } from 'src/lib/functions';

@Injectable()
export class HookahsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Hookah) private hookahRepository: Repository<Hookah>,
    private productService: ProductsService,
  ) {}

  async createHookah(createHookahDto: CreateHookahDto) {
    const hookah = this.hookahRepository.create(createHookahDto);
    return await this.hookahRepository.save(hookah);
  }

  async updateHookah(hookahId: number, updateHookahDto: UpdateHookahDto) {
    const hookah = await this.hookahRepository.findOne({
      where: { id: hookahId },
    });

    if (!hookah) {
      throw new NotFoundException(`product with id ${hookahId} not found`);
    }

    const dto = {
      color: updateHookahDto.color || hookah.color,
      size: updateHookahDto.hookah_size || hookah.hookah_size,
    };

    await this.hookahRepository.update(hookahId, dto);
    return await this.hookahRepository.findOne({ where: { id: hookahId } });
  }

  // async createProductWithHookah(
  //   createProductDto: CreateProductDto,
  //   createhookahDto: CreateHookahDto,
  // ) {
  //   const product = await this.productService.createProduct(createProductDto);
  //   const hookah = await this.createHookah(createhookahDto);

  //   product.hookahs = hookah;
  //   await this.productRepository.save(product);

  //   return product;
  // }

  // async updateProductWithHookah(
  //   productId: number,
  //   updateProductDto: UpdateProductDto,
  //   updateHookahDto: UpdateHookahDto,
  // ) {
  //   const updatedProduct = await this.productService.updateProduct(
  //     productId,
  //     updateProductDto,
  //   );

  //   const updatedHookah = await this.updateHookah(
  //     updatedProduct.hookahs.id,
  //     updateHookahDto,
  //   );

  //   updatedProduct.hookahs = updatedHookah;
  //   await this.productRepository.save(updatedProduct);

  //   return updatedProduct;
  // }

  async findAllHookahs(params: ISearchHookahs) {
    const { page, limit, sort, brand, status, color, hookahSize, min, max } =
      params;

    // const brandsArr = await paramToArr(brand);
    // const colorsArr = await paramToArr(color);
    // const hookahSizesArr = await paramToArr(hookahSize);

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.hookahs', 'hookahs');

    if (status) {
      query = query.andWhere('product.status = :status', { status });
    }

    // if (brandsArr && brandsArr.length > 0) {
    //   query = query.andWhere('LOWER(product.brand) IN (:...brandsArr)', {
    //     brandsArr: brandsArr.map(brand => brand.toLowerCase()),
    //   });
    // }
    // if (colorsArr && colorsArr.length > 0) {
    //   query = query.andWhere('LOWER(hookahs.color) IN (:...colorsArr)', {
    //     colorsArr: colorsArr.map(color => color.toLocaleLowerCase()),
    //   });
    // }
    // if (hookahSizesArr && hookahSizesArr.length > 0) {
    //   query = query.andWhere('(hookahs.hookah_size) IN (:...hookahSizesArr)', {
    //     hookahSizesArr: hookahSizesArr.map(size => size.toLocaleLowerCase()),
    //   });
    // }
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
    // const colorCounts: { [key: string]: number } = {};
    // const hookahSizeCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};
    const prices = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
    if (products.length <= 0) {
      prices.min = 0;
      prices.max = 0;
    }
    products.forEach(product => {
      // const brand = product.brand.toLowerCase();
      // const color = product.hookahs.color.toLocaleLowerCase();
      // const size = product.hookahs.hookah_size.toLocaleLowerCase();
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

      // if (!colorCounts[color]) {
      //   colorCounts[color] = 0;
      // }
      // colorCounts[color]++;

      // if (!hookahSizeCounts[size]) {
      //   hookahSizeCounts[size] = 0;
      // }
      // hookahSizeCounts[size]++;
    });

    const sortedProducts = await sortProductsByPrice(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);

    return {
      products: paginatedProducts,
      counts: {
        total,
        // brandCounts,
        // colorCounts,
        // hookahSizeCounts,
        statusCounts,
        prices,
      },
    };
  }
}
