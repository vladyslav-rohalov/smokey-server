import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    const dto = {
      promotion: updateProductDto.promotion || product.promotion,
      status: updateProductDto.status || product.status,
      price: updateProductDto.price || product.price,
      description: updateProductDto.description || product.description,
      brand: updateProductDto.brand || product.brand,
      title: updateProductDto.title || product.title,
      available: updateProductDto.available || product.available,
    };

    await this.productRepository.update(productId, dto);

    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['tobacco', 'hookahs', 'coals', 'accessories'],
    });
  }

  async findAll(page: number, limit: number) {
    if (!page || isNaN(page) || page <= 0) {
      page = 1;
    }
    if (!limit || isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      relations: ['tobacco', 'hookahs', 'coals', 'accessories'],
      take: limit,
      skip: skip,
    });

    return {
      products,
      total,
    };
  }

  async findOne(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['tobacco', 'hookahs', 'coals', 'accessories'],
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    return product;
  }

  async findAllTobacco(page: number, limit: number) {
    if (!page || isNaN(page) || page <= 0) {
      page = 1;
    }
    if (!limit || isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.tobacco', 'tobacco')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      products,
      total,
    };
  }

  async findAllHookahs(page: number, limit: number) {
    if (!page || isNaN(page) || page <= 0) {
      page = 1;
    }
    if (!limit || isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    const skip = (page - 1) * limit;
    const [products, total] = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.hookahs', 'hookahs')
      .skip(skip)
      .take(limit)
      .getMany();

    return {
      products,
      total,
    };
  }

  async findAllCoals(page: number, limit: number) {
    if (!page || isNaN(page) || page <= 0) {
      page = 1;
    }
    if (!limit || isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    const skip = (page - 1) * limit;
    const [products, total] = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.coals', 'coals')
      .skip(skip)
      .take(limit)
      .getMany();

    return {
      products,
      total,
    };
  }

  async findAllAccessories(page: number, limit: number) {
    if (!page || isNaN(page) || page <= 0) {
      page = 1;
    }
    if (!limit || isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    const skip = (page - 1) * limit;
    const [products, total] = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.accessories', 'accessories')
      .skip(skip)
      .take(limit)
      .getMany();

    return {
      products,
      total,
    };
  }

  async remove(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    await this.productRepository.remove(product);
  }

  async addImages(productId: number, images: string[]) {}

  async findAllPromotion() {
    const promoted = await this.productRepository.find({
      where: {
        promotion: In(['hot', 'sale', 'new']),
      },
      relations: ['tobacco', 'hookahs', 'coals', 'accessories'],
    });

    return promoted;
  }
}
