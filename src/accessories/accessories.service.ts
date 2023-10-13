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
    console.log(product);
    console.log(accessory);
    product.accessory = accessory;
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
      updatedProduct.accessory.id,
      updateAccessoryDto,
    );

    updatedProduct.accessory = updatedAccessory;
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async findAllAccessories() {
    const accesory = await this.productService.findAllAccessories();
    return accesory;
  }
}
