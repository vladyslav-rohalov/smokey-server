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
    const tobacco = this.tobaccoRepository.findOne({
      where: { id: tobaccoId },
    });
    if (!tobacco) {
      throw new NotFoundException(`product with id ${tobaccoId} not found`);
    }
    await this.tobaccoRepository.update(tobaccoId, updateTobaccoDto);
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
    const product = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );
    const tobacco = await this.updateTobacco(
      product.tobacco.id,
      updateTobaccoDto,
    );

    product.tobacco = tobacco;
    await this.productRepository.save(product);

    return product;
  }

  async findAllTobacco() {
    const tobacco = await this.productService.findAllTobacco();
    return tobacco;
  }

  update(id: number, updateTobaccoDto: UpdateTobaccoDto) {
    return `This action updates a #${id} tobacco`;
  }

  remove(id: number) {
    return `This action removes a #${id} tobacco`;
  }
}
