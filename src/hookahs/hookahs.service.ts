import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHookahDto } from './dto/create-hookah.dto';
import { UpdateHookahDto } from './dto/update-hookah.dto';
import { Product } from 'src/products/entities/product.entity';
import { Hookah } from './entities/hookah.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class HookahsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Hookah) private hookahRepository: Repository<Hookah>,
    private productService: ProductsService,
  ) {}

  async createHookah(createHookahDto: CreateHookahDto) {
    const hookah = this.hookahRepository.create(createHookahDto);
    return await this.hookahRepository.save(hookah);
  }

  async updateHookah(hookahId: number, updateHookahDto: UpdateHookahDto) {
    const hookah = await this.hookahRepository.findOne({
      where: { id: hookahId },
    });

    if (!hookah) {
      throw new NotFoundException(`product with id ${hookahId} not found`);
    }

    const dto = {
      color: updateHookahDto.color || hookah.color,
      size: updateHookahDto.size || hookah.size,
    };

    await this.hookahRepository.update(hookahId, dto);
    return await this.hookahRepository.findOne({ where: { id: hookahId } });
  }

  async createProductWithHookah(
    createProductDto: CreateProductDto,
    createhookahDto: CreateHookahDto,
  ) {
    const product = await this.productService.createProduct(createProductDto);
    const hookah = await this.createHookah(createhookahDto);

    product.hookahs = hookah;
    await this.productRepository.save(product);

    return product;
  }

  async updateProductWithHookah(
    productId: number,
    updateProductDto: UpdateProductDto,
    updateHookahDto: UpdateHookahDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    const updatedHookah = await this.updateHookah(
      updatedProduct.hookahs.id,
      updateHookahDto,
    );

    updatedProduct.hookahs = updatedHookah;
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async findAllHookahs() {
    const hookah = await this.productService.findAllHookahs();
    return hookah;
  }
}
