import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoalDto } from './dto/create-coal.dto';
import { UpdateCoalDto } from './dto/update-coal.dto';
import { Product } from 'src/products/entities/product.entity';
import { Coal } from './entities/coal.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductsService } from 'src/products/products.service';
import { ISearchCoals } from 'src/lib/interfaces';
import { sortProductsByPrice, Pagination } from 'src/lib/functions';
import { paramToArr } from 'src/lib/functions';

@Injectable()
export class CoalsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Coal) private coalRepository: Repository<Coal>,
    private productService: ProductsService,
  ) {}

  async createCoal(createCoalDto: CreateCoalDto) {
    const coal = this.coalRepository.create(createCoalDto);
    return await this.coalRepository.save(coal);
  }

  async createProductWithCoal(
    createProductDto: CreateProductDto,
    createCoalDto: CreateCoalDto,
  ) {
    const product = await this.productService.createProduct(createProductDto);
    const coal = await this.createCoal(createCoalDto);

    product.coals = coal;
    await this.productRepository.save(product);

    return product;
  }

  async updateCoal(coalId: number, updateCoalDto: UpdateCoalDto) {
    const coal = await this.coalRepository.findOne({
      where: { id: coalId },
    });

    if (!coal) {
      throw new NotFoundException(`product with id ${coalId} not found`);
    }

    const dto = {
      coal_size: updateCoalDto.coal_size || coal.coal_size,
      coal_weight: updateCoalDto.coal_weight || coal.coal_weight,
    };

    await this.coalRepository.update(coalId, dto);
    return await this.coalRepository.findOne({ where: { id: coalId } });
  }

  async updateProductWithCoals(
    productId: number,
    updateProductDto: UpdateProductDto,
    UpdateCoalDto: UpdateCoalDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    const updatedCoal = await this.updateCoal(
      updatedProduct.coals.id,
      UpdateCoalDto,
    );

    updatedProduct.coals = updatedCoal;
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async findAllСoals(params: ISearchCoals) {
    const { page, limit, sort, brand, status, coalSize, coalWeight } = params;
    const { id, images, publish, promotion, min, max } = params;

    const brandsArr = await paramToArr(brand);
    const weightsArr = await paramToArr(coalWeight);
    const sizesArr = await paramToArr(coalSize);

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.coals', 'coals')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion');

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

    if (sizesArr && sizesArr.length > 0) {
      query = query.andWhere('(coals.coal_size) IN (:...sizesArr)', {
        sizesArr: sizesArr.map(size => +size),
      });
    }

    if (weightsArr && weightsArr.length > 0) {
      query = query.andWhere('(coals.coal_weight) IN (:...weightsArr)', {
        weightsArr: weightsArr.map(weight => +weight),
      });
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
    const sizeCounts: { [key: string]: number } = {};
    const weightCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};
    const prices = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
    if (products.length <= 0) {
      prices.min = 0;
      prices.max = 0;
    }
    products.forEach(product => {
      const brand = product.brand.brand.toLowerCase();
      const size = product.coals.coal_size;
      const weight = product.coals.coal_weight;
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

      if (!sizeCounts[size]) {
        sizeCounts[size] = 0;
      }
      sizeCounts[size]++;

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
        brandCounts,
        sizeCounts,
        weightCounts,
        statusCounts,
        prices,
      },
    };
  }
}
