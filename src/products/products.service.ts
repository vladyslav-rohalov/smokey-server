import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { BrandService } from 'src/enums/brand/brand.service';
import { PromotionService } from 'src/enums/promotion/promotion.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandService: BrandService,
    private promotionService: PromotionService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const brand = await this.brandService.getBrand(createProductDto.brand);

    const promotion = await this.promotionService.getPromotion(
      createProductDto.promotion,
    );
    const product = this.productRepository.create({
      ...createProductDto,
      brand: brand,
      promotion: promotion,
    });
    return await this.productRepository.save(product);
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    const brand = await this.brandService.getBrand(updateProductDto.brand);

    const promotion = await this.promotionService.getPromotion(
      updateProductDto.promotion,
    );

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    const dto = {
      promotion: promotion,
      status: updateProductDto.status || product.status,
      price: updateProductDto.price || product.price,
      description: updateProductDto.description || product.description,
      brand: brand,
      title: updateProductDto.title || product.title,
      available: updateProductDto.available || product.available,
    };

    await this.productRepository.update(productId, dto);

    return await this.productRepository.findOne({
      where: { id: productId },
      relations: [
        'tobacco',
        'hookahs',
        'coals',
        'accessories',
        'brand',
        'promotion',
      ],
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
    let response = null;
    if (product.accessories) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: [
          'accessories',
          'accessories.type',
          'accessories.bowl_type',
          'brand',
          'promotion',
        ],
      });
    }
    if (product.tobacco) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['tobacco', 'tobacco.flavor', 'brand', 'promotion'],
      });
    }
    if (product.coals) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['coals', 'brand', 'promotion'],
      });
    }
    if (product.hookahs) {
      response = await this.productRepository.findOne({
        where: { id: productId },
        relations: [
          'hookahs',
          'hookahs.hookah_size',
          'hookahs.color',
          'brand',
          'promotion',
        ],
      });
    }
    return response;
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
