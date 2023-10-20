import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Product } from 'src/products/entities/product.entity';
import { Accessory } from './entities/accessory.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductsService } from 'src/products/products.service';
import { ISearchAccessories } from 'src/lib/interfaces';
import { sortProductsByPrice, Pagination } from 'src/lib/functions';
import { paramToArr } from 'src/lib/functions';

@Injectable()
export class AccessoriesService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Accessory)
    private accessoriesRepository: Repository<Accessory>,
    private productService: ProductsService,
  ) {}

  async createAccessory(
    createAccessoryDto: CreateAccessoryDto,
  ): Promise<Accessory> {
    const accessory = this.accessoriesRepository.create(createAccessoryDto);
    return await this.accessoriesRepository.save(accessory);
  }

  async updateAccessory(
    accessoryId: number,
    updateAccessoryDto: UpdateAccessoryDto,
  ) {
    const accesory = await this.accessoriesRepository.findOne({
      where: { id: accessoryId },
    });

    if (!accesory) {
      throw new NotFoundException(`product with id ${accessoryId} not found`);
    }

    const dto = {
      type: updateAccessoryDto.type || accesory.type,
      bowl_type: updateAccessoryDto.bowl_type || accesory.bowl_type,
    };

    await this.accessoriesRepository.update(accessoryId, dto);
    return await this.accessoriesRepository.findOne({
      where: { id: accessoryId },
    });
  }

  async createProductWithAccessory(
    createProductDto: CreateProductDto,
    createAccessoryDto: CreateAccessoryDto,
  ) {
    const product = await this.productService.createProduct(createProductDto);
    const accessory = await this.createAccessory(createAccessoryDto);

    product.accessories = accessory;
    await this.productRepository.save(product);

    return product;
  }

  async updateProductWithAccessory(
    productId: number,
    updateProductDto: UpdateProductDto,
    updateAccessoryDto: UpdateAccessoryDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    const updatedAccessory = await this.updateAccessory(
      updatedProduct.accessories.id,
      updateAccessoryDto,
    );

    updatedProduct.accessories = updatedAccessory;
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async findAllAccessories(params: ISearchAccessories) {
    const { page, limit, sort, brand, status, type, bowlType, min, max } =
      params;

    const brandsArr = await paramToArr(brand);
    const typesArr = await paramToArr(type);
    const bowlTypesArr = await paramToArr(bowlType);

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.accessories', 'accessories');

    if (status) {
      query = query.andWhere('product.status = :status', { status });
    }

    if (brandsArr && brandsArr.length > 0) {
      query = query.andWhere('LOWER(product.brand) IN (:...brandsArr)', {
        brandsArr: brandsArr.map(brand => brand.toLowerCase()),
      });
    }
    if (typesArr && typesArr.length > 0) {
      query = query.andWhere('(accessories.type) IN (:...typesArr)', {
        typesArr: typesArr.map(type => type.toLocaleLowerCase()),
      });
    }
    if (bowlTypesArr && bowlTypesArr.length > 0) {
      query = query.andWhere('(accessories.bowl_type) IN (:...bowlTypesArr)', {
        bowlTypesArr: bowlTypesArr.map(bowlType => bowlType.toLowerCase()),
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
    // const brandCounts: { [key: string]: number } = {};
    const typeCounts: { [key: string]: number } = {};
    const bowlTypeCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};
    const prices = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
    if (products.length <= 0) {
      prices.min = 0;
      prices.max = 0;
    }
    products.forEach(product => {
      // const brand = product.brand.toLowerCase();
      // const type = product.accessories.type.toLowerCase();
      const status = product.status.toLocaleLowerCase();
      const price = +product.price;

      // if (product.accessories && product.accessories.bowl_type) {
      //   const bowlType = product.accessories.bowl_type.toLowerCase();

      //   if (!bowlTypeCounts[bowlType]) {
      //     bowlTypeCounts[bowlType] = 0;
      //   }
      //   bowlTypeCounts[bowlType]++;
      // }

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

      if (!typeCounts[type]) {
        typeCounts[type] = 0;
      }
      typeCounts[type]++;

      // if (!bowlTypeCounts[bowlType]) {
      //   bowlTypeCounts[bowlType] = 0;
      // }
      // bowlTypeCounts[bowlType]++;
    });

    const sortedProducts = await sortProductsByPrice(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);

    return {
      products: paginatedProducts,
      counts: {
        total,
        // brandCounts,
        typeCounts,
        bowlTypeCounts,
        statusCounts,
        prices,
      },
    };
  }
}
