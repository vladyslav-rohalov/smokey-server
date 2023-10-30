import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Hookah } from './entities/hookah.entity';
import { ColorService } from 'src/enums/color/color.service';
import { HookahSizeService } from 'src/enums/hookah-size/hookah-size.service';
import { ProductsService } from 'src/products/products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { CreateHookahDto } from './dto/create-hookah.dto';
import { UpdateHookahDto } from './dto/update-hookah.dto';
import { ISearchHookahs } from 'src/lib/interfaces';
import { sortProducts, Pagination } from 'src/lib/functions';
import { paramToArr } from 'src/lib/functions';

@Injectable()
export class HookahsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Hookah) private hookahRepository: Repository<Hookah>,
    private productService: ProductsService,
    private colorService: ColorService,
    private hookahSizeServie: HookahSizeService,
  ) {}

  async createHookah(createHookahDto: CreateHookahDto): Promise<Hookah> {
    const color = await this.colorService.getColor(createHookahDto.color);
    console.log(color);
    const hookah_size = await this.hookahSizeServie.getHookahSize(
      createHookahDto.hookah_size,
    );
    const hookah = this.hookahRepository.create({
      ...createHookahDto,
      color,
      hookah_size,
    });
    return await this.hookahRepository.save(hookah);
  }

  async createProductWithHookah(
    createProductDto: CreateProductDto,
    createhookahDto: CreateHookahDto,
  ) {
    const product = await this.productService.createProduct(createProductDto);
    const hookah = await this.createHookah(createhookahDto);

    product.hookahs = hookah;
    await this.productRepository.save(product);

    return product;
  }

  async updateHookah(hookahId: number, updateHookahDto: UpdateHookahDto) {
    const color = await this.colorService.getColor(updateHookahDto.color);
    const hookah_size = await this.hookahSizeServie.getHookahSize(
      updateHookahDto.hookah_size,
    );
    const hookah = await this.hookahRepository.findOne({
      where: { id: hookahId },
    });

    if (!hookah) {
      throw new NotFoundException(`product with id ${hookahId} not found`);
    }

    const dto = {
      color,
      hookah_size,
    };

    await this.hookahRepository.update(hookahId, dto);
    return await this.hookahRepository.findOne({
      where: { id: hookahId },
      relations: ['color', 'hookah_size'],
    });
  }

  async updateProductWithHookah(
    productId: number,
    updateProductDto: UpdateProductDto,
    updateHookahDto: UpdateHookahDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    const updatedHookah = await this.updateHookah(
      updatedProduct.hookahs.id,
      updateHookahDto,
    );

    updatedProduct.hookahs = updatedHookah;
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async findAllHookahs(params: ISearchHookahs) {
    const { page, limit, sort, brand, status, color, hookahSize } = params;
    const { id, images, publish, promotion, min, max } = params;

    const brandsArr = await paramToArr(brand);
    const colorsArr = await paramToArr(color);
    const hookahSizesArr = await paramToArr(hookahSize);

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .innerJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('hookahs.color', 'color')
      .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size');

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

    if (colorsArr && colorsArr.length > 0) {
      query = query.andWhere(
        'hookahs.color_id IN ( SELECT color_id FROM color WHERE LOWER(color) IN (:...colorsArr))',
        {
          colorsArr: colorsArr.map(color => color.toLocaleLowerCase()),
        },
      );
    }
    if (hookahSizesArr && hookahSizesArr.length > 0) {
      query = query.andWhere(
        'hookahs.hookah_size_id IN (SELECT hookah_size_id FROM hookah_size WHERE LOWER(hookah_size) IN (:...hookahSizesArr))',
        {
          hookahSizesArr: hookahSizesArr.map(size => size.toLocaleLowerCase()),
        },
      );
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
    const brandCounts: { [key: string]: number } = {};
    const colorCounts: { [key: string]: number } = {};
    const hookahSizeCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};
    const prices = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
    if (products.length <= 0) {
      prices.min = 0;
      prices.max = 0;
    }
    products.forEach(product => {
      const brand = product.brand.brand.toLowerCase();
      const color = product.hookahs.color.color.toLocaleLowerCase();
      const size = product.hookahs.hookah_size.hookah_size.toLocaleLowerCase();
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

      if (!colorCounts[color]) {
        colorCounts[color] = 0;
      }
      colorCounts[color]++;

      if (!hookahSizeCounts[size]) {
        hookahSizeCounts[size] = 0;
      }
      hookahSizeCounts[size]++;
    });

    const sortedProducts = await sortProducts(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);

    return {
      products: paginatedProducts,
      counts: {
        total,
        brandCounts,
        colorCounts,
        hookahSizeCounts,
        statusCounts,
        prices,
      },
    };
  }
}
