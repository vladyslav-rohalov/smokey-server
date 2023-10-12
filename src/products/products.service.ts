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
    const product = this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    await this.productRepository.update(productId, updateProductDto);
    return await this.productRepository.findOne({ where: { id: productId } });
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

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
