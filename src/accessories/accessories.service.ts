import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Product } from 'src/products/entities/product.entity';
import { Accessory } from './entities/accessory.entity';
import { Brand } from 'src/enums/brand/entities/brand.entity';
import { Promotion } from 'src/enums/promotion/entities/promotion.entity';
import { AccessoryType } from 'src/enums/accessory-type/entities/accessory-type.entity';
import { BowlType } from 'src/enums/bowl-type/entities/bowl-type.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductsService } from 'src/products/products.service';
import { AccessoryTypeService } from 'src/enums/accessory-type/accessory-type.service';
import { BowlTypeService } from 'src/enums/bowl-type/bowl-type.service';
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
    private accessoryTypeService: AccessoryTypeService,
    private bowlTypeService: BowlTypeService,
  ) {}

  async createAccessory(
    createAccessoryDto: CreateAccessoryDto,
  ): Promise<Accessory> {
    const type = await this.accessoryTypeService.getType(
      createAccessoryDto.type,
    );
    if (createAccessoryDto.bowl_type) {
    }
    const bowl_type = createAccessoryDto.bowl_type
      ? await this.bowlTypeService.getBowlType(createAccessoryDto.bowl_type)
      : null;

    const accessory = this.accessoriesRepository.create({
      ...createAccessoryDto,
      type,
      bowl_type,
    });
    return await this.accessoriesRepository.save(accessory);
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

  // async updateAccessory(
  //   accessoryId: number,
  //   updateAccessoryDto: UpdateAccessoryDto,
  // ) {
  //   const accesory = await this.accessoriesRepository.findOne({
  //     where: { id: accessoryId },
  //   });

  //   if (!accesory) {
  //     throw new NotFoundException(`product with id ${accessoryId} not found`);
  //   }

  //   const dto = {
  //     type: updateAccessoryDto.type || accesory.type,
  //     bowl_type: updateAccessoryDto.bowl_type || accesory.bowl_type,
  //   };

  //   await this.accessoriesRepository.update(accessoryId, dto);
  //   return await this.accessoriesRepository.findOne({
  //     where: { id: accessoryId },
  //   });
  // }

  // async updateProductWithAccessory(
  //   productId: number,
  //   updateProductDto: UpdateProductDto,
  //   updateAccessoryDto: UpdateAccessoryDto,
  // ) {
  //   const updatedProduct = await this.productService.updateProduct(
  //     productId,
  //     updateProductDto,
  //   );

  //   const updatedAccessory = await this.updateAccessory(
  //     updatedProduct.accessories.id,
  //     updateAccessoryDto,
  //   );

  //   updatedProduct.accessories = updatedAccessory;
  //   await this.productRepository.save(updatedProduct);

  //   return updatedProduct;
  // }

  async findAllAccessories(params: ISearchAccessories) {
    const { page, limit, sort, brand, status, type, bowlType, min, max } =
      params;

    const brandsArr = await paramToArr(brand);
    const typesArr = await paramToArr(type);
    const bowlTypesArr = await paramToArr(bowlType);

    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.accessories', 'accessories')
      .leftJoinAndSelect('accessories.type', 'type')
      .leftJoinAndSelect('accessories.bowl_type', 'bowl_type')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion');

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

    if (typesArr && typesArr.length > 0) {
      query = query.andWhere(
        'accessories.type_id IN (SELECT type_id FROM type WHERE LOWER(type) IN (:...typesArr))',
        {
          typesArr: typesArr.map(type => type.toLocaleLowerCase()),
        },
      );
    }

    if (bowlTypesArr && bowlTypesArr.length > 0) {
      query = query.andWhere(
        'accessories.bowl_type_id IN (SELECT bowl_type_id FROM bowl_type WHERE LOWER(bowl_type) IN (:...bowlTypesArr))',
        {
          bowlTypesArr: bowlTypesArr.map(bowlType => bowlType.toLowerCase()),
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
    const typeCounts: { [key: string]: number } = {};
    const bowlTypeCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {};
    const prices = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
    if (products.length <= 0) {
      prices.min = 0;
      prices.max = 0;
    }

    products.forEach(product => {
      const brand = product.brand.brand.toLowerCase();
      const type = product.accessories?.type?.type?.toLowerCase();
      const bowlType = product.accessories?.bowl_type?.bowl_type?.toLowerCase();
      const status = product.status.toLocaleLowerCase();
      const price = +product.price;

      if (bowlType !== undefined) {
        if (!bowlTypeCounts[bowlType]) {
          bowlTypeCounts[bowlType] = 0;
        }
        bowlTypeCounts[bowlType]++;
      }
      if (type !== undefined) {
        if (!typeCounts[type]) {
          typeCounts[type] = 0;
        }
        typeCounts[type]++;
      }

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
    });

    const sortedProducts = await sortProductsByPrice(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);

    return {
      products: paginatedProducts,
      counts: {
        total,
        brandCounts,
        typeCounts,
        bowlTypeCounts,
        statusCounts,
        prices,
      },
    };
  }
}
