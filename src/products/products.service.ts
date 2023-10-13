import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      relations: ['tobacco'],
    });
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['tobacco'],
    });
    return products;
  }

  async findOne(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['tobacco'],
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    return product;
  }

  async findAllTobacco() {
    const tobacco = await this.productRepository.find({
      relations: ['tobacco'],
    });
    return tobacco;
  }

  async addImages(productId: number, images: string[]) {}
}
