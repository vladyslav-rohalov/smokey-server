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
      // relations: ['tobacco', 'hookahs', 'coals', 'accessories'],
      relations: ['tobacco', 'hookahs', 'coals'],
    });
  }

  async findAll() {
    const products = await this.productRepository.find({
      // relations: ['tobacco', 'hookahs', 'coals', 'accessories'],
      relations: ['tobacco', 'hookahs', 'coals'],
    });
    return products;
  }

  async findOne(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['tobacco', 'hookahs', 'coals'],
      // relations: ['tobacco', 'hookahs', 'coals', 'accessories'],
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    return product;
  }

  async findAllTobacco() {
    const tobacco = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.tobacco', 'tobacco')
      .getMany();

    return tobacco;
  }

  async findAllHookahs() {
    const hookahs = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.hookahs', 'hookahs')
      .getMany();

    return hookahs;
    // const hookahs = await this.productRepository.find({
    //   relations: ['hookahs'],
    // });
    // return hookahs;
  }

  async findAllCoals() {
    const coals = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.coals', 'coals')
      .getMany();

    return coals;
    // const coals = await this.productRepository.find({
    //   relations: ['coals'],
    // });
    // console.log(coals);
    // return coals;
  }

  async findAllAccessories() {
    const accessories = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.accessories', 'accessories')
      .getMany();

    return accessories;
    // const accessories = await this.productRepository.find({
    //   relations: ['accessories'],
    // });
    // return accessories;
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
}
