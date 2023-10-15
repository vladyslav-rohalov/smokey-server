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

  async findAllcoal(page: number, limit: number) {
    const coals = await this.productService.findAllCoals(page, limit);
    return coals;
  }
}
