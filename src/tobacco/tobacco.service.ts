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
      weight: updateTobaccoDto.weight || tobacco.weight,
      strength: updateTobaccoDto.strength || tobacco.strength,
    };

    await this.tobaccoRepository.update(tobaccoId, dto);
    return await this.tobaccoRepository.findOne({ where: { id: tobaccoId } });
  }

  async createProductWithTobacco(
    createProductDto: CreateProductDto,
    createTobaccoDto: CreateTobaccoDto,
  ) {
    const product = await this.productService.createProduct(createProductDto);
    const tobacco = await this.createTobacco(createTobaccoDto);

    product.tobacco = tobacco;
    await this.productRepository.save(product);

    return product;
  }

  async updateProductWithTobacco(
    productId: number,
    updateProductDto: UpdateProductDto,
    updateTobaccoDto: UpdateTobaccoDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    const updatedTobacco = await this.updateTobacco(
      updatedProduct.tobacco.id,
      updateTobaccoDto,
    );

    updatedProduct.tobacco = updatedTobacco;
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async findAllTobacco() {
    const tobacco = await this.productService.findAllTobacco();
    return tobacco;
  }

  async remove(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['tobacco'],
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }

    const tobacco = await this.tobaccoRepository.findOne({
      where: { id: product.tobacco.id },
    });

    await this.productRepository.remove(product);
    await this.tobaccoRepository.remove(tobacco);
  }
}
