import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { BrandService } from 'src/enums/brand/brand.service';
import { PromotionService } from 'src/enums/promotion/promotion.service';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { ISearch, IOptionsUpload } from 'src/lib/interfaces';
import { Pagination, sortProducts } from 'src/lib/functions';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandService: BrandService,
    private promotionService: PromotionService,
    private s3Service: AwsS3Service,
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
      status: updateProductDto.status,
      price: updateProductDto.price,
      description: updateProductDto.description,
      brand: brand,
      title: updateProductDto.title,
      available: updateProductDto.available,
      publish: updateProductDto.publish,
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

  async findAll(params: Partial<ISearch>) {
    let { page, limit, sort, id, images, publish } = params;
    let { brand, status, min, max, promotion } = params;
    let query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('product.tobacco', 'tobacco')
      .leftJoinAndSelect('product.coals', 'coals')
      .leftJoinAndSelect('product.accessories', 'accessories')
      .leftJoinAndSelect('tobacco.flavor', 'flavor')
      .leftJoinAndSelect('hookahs.color', 'color')
      .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
      .leftJoinAndSelect('accessories.type', 'type')
      .leftJoinAndSelect('accessories.bowl_type', 'bowl_type');

    if (status) {
      query = query.andWhere('product.status = :status', { status });
    }
    if (id) {
      query = query.andWhere('product.id = :id', { id });
    }
    if (publish) {
      query = query.andWhere('product.publish = :publish', { publish });
    }
    if (images) {
      if (images === true) {
        query = query.andWhere('product.images IS NOT NULL');
      } else if (images === false) {
        query = query.andWhere('product.images IS NULL');
      }
    }
    if (brand) {
      query = query.andWhere('LOWER(brand.brand) = :brand', {
        brand: brand.toLowerCase(),
      });
    }
    if (promotion) {
      query = query.andWhere('LOWER(promotion.promotion) = :promotion', {
        promotion: promotion.toLowerCase(),
      });
    }
    if (min && max) {
      query = query.andWhere('product.price BETWEEN :min AND :max', {
        min,
        max,
      });
    } else if (min) {
      query = query.andWhere('product.price >= :min', { min });
    } else if (max) {
      query = query.andWhere('product.price <= :max', { max });
    }

    const products = await query.getMany();
    const total = products.length;
    const sortedProducts = await sortProducts(products, sort);
    const paginatedProducts = await Pagination(sortedProducts, page, limit);

    return {
      counts: {
        total,
      },
      products: paginatedProducts,
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

  async findRelatedById(productId: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('product.tobacco', 'tobacco')
      .leftJoinAndSelect('product.coals', 'coals')
      .leftJoinAndSelect('product.accessories', 'accessories')
      .leftJoinAndSelect('tobacco.flavor', 'flavor')
      .leftJoinAndSelect('hookahs.color', 'color')
      .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
      .leftJoinAndSelect('accessories.type', 'type')
      .leftJoinAndSelect('accessories.bowl_type', 'bowl_type')
      .andWhere('product.id = :productId', { productId })
      .getOne();

    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    let response = null;

    if (product.accessories) {
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.accessories', 'accessories')
        .leftJoinAndSelect('accessories.type', 'type')
        .leftJoinAndSelect('accessories.bowl_type', 'bowl_type')
        .andWhere('accessories.type = :type_id', {
          type_id: product.accessories.type.id,
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
    }
    if (product.tobacco) {
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.tobacco', 'tobacco')
        .leftJoinAndSelect('tobacco.flavor', 'flavor')
        .andWhere('product.brand = :brand_id', {
          brand_id: product.brand.id,
        })
        .andWhere('tobacco.tobacco_weight = :weight', {
          weight: product.tobacco.tobacco_weight,
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
    }
    if (product.coals) {
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.coals', 'coals')
        .andWhere('coals.coal_size = :coal_size', {
          coal_size: product.coals.coal_size,
        })
        .andWhere('coals.coal_weight = :weight', {
          weight: product.coals.coal_weight,
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
    }
    const priceThreshold = 0.2;
    if (product.hookahs) {
      const basePrice = product.price;
      response = await this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.promotion', 'promotion')
        .leftJoinAndSelect('product.hookahs', 'hookahs')
        .leftJoinAndSelect('hookahs.color', 'color')
        .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
        .where('hookahs.id IS NOT NULL')
        .andWhere('product.price >= :minPrice', {
          minPrice: basePrice * (1 - priceThreshold),
        })
        .andWhere('product.price <= :maxPrice', {
          maxPrice: basePrice * (1 + priceThreshold),
        })
        .andWhere('product.id != :productId', {
          productId,
        })
        .getMany();
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

    if (product.images !== null) {
      await this.s3Service.deleteImages(product.images);
    }

    await this.productRepository.remove(product);
  }

  async findAllPromotion() {
    const promoted = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.promotion', 'promotion')
      .leftJoinAndSelect('product.hookahs', 'hookahs')
      .leftJoinAndSelect('product.tobacco', 'tobacco')
      .leftJoinAndSelect('product.coals', 'coals')
      .leftJoinAndSelect('product.accessories', 'accessories')
      .leftJoinAndSelect('tobacco.flavor', 'flavor')
      .leftJoinAndSelect('hookahs.color', 'color')
      .leftJoinAndSelect('hookahs.hookah_size', 'hookah_size')
      .leftJoinAndSelect('accessories.type', 'type')
      .leftJoinAndSelect('accessories.bowl_type', 'bowl_type')
      .where('promotion.promotion IN (:...values)', {
        values: ['hot', 'sale', 'new'],
      })
      .andWhere('product.publish = :publish', { publish: true })
      .getMany();

    return promoted;
  }

  async addImages(
    productId: number,
    images: Express.Multer.File[],
    options: IOptionsUpload,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    const uploaded = await this.s3Service.uploadFiles(images, options);
    const imagesArr = uploaded.map(file => file.Location);
    const updatedImages = product.images
      ? [...product.images, ...imagesArr]
      : imagesArr;
    await this.productRepository.update(productId, { images: updatedImages });

    return await this.findOne(productId);
  }

  async removeImages(productId: number, images: string[]) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    const filtredImages = product.images.filter(
      image => !images.includes(image),
    );
    const updatedImages = filtredImages.length ? filtredImages : null;
    await this.s3Service.deleteImages(images);
    await this.productRepository.update(productId, { images: updatedImages });

    return await this.findOne(productId);
  }

  async publish(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`product with id ${productId} not found`);
    }
    await this.productRepository.update(productId, {
      publish: !product.publish,
    });

    return await this.findOne(productId);
  }

  async findCart(createCartDto: CreateCartDto): Promise<Product[]> {
    const productIds = createCartDto.items.map(item => item.productId);

    const products = await this.productRepository.findBy({
      id: In(productIds),
    });

    return products.map(product => {
      const item = createCartDto.items.find(
        item => item.productId === product.id,
      );
      const quantity =
        item.quantity > product.available ? product.available : item.quantity;
      return item ? { ...product, quantity } : product;
    });
  }

  async getTabs() {
    const response = await this.findAll({ limit: 10000 });
    const hookahBrands = [];
    const hookahColors = [];
    const hookahSizes = [];
    const tobaccoBrands = [];
    const tobaccoFlavors = [];
    const tobaccoWeights = [];
    const coalBrands = [];
    const coalSizes = [];
    const coalWeights = [];
    const accessoryBrands = [];
    const accessoryTypes = [];

    response.products.forEach(product => {
      const { brand, hookahs, tobacco, coals, accessories } = product;

      if (hookahs) {
        hookahBrands.push(brand.brand);
        hookahColors.push(hookahs.color.color);
        hookahSizes.push(hookahs.hookah_size.hookah_size);
      } else if (tobacco) {
        tobaccoBrands.push(brand.brand);
        tobaccoFlavors.push(tobacco.flavor.flavor);
        tobaccoWeights.push(tobacco.tobacco_weight);
      } else if (coals) {
        coalBrands.push(brand.brand);
        coalSizes.push(coals.coal_size);
        coalWeights.push(coals.coal_weight);
      } else if (accessories) {
        accessoryBrands.push(brand.brand);
        accessoryTypes.push(accessories.type.type);
      }
    });

    const productTabs = [
      {
        name: 'hookahs',
        brands: Array.from(new Set(hookahBrands)),
        colors: Array.from(new Set(hookahColors)),
        hookahSizes: Array.from(new Set(hookahSizes)),
      },
      {
        name: 'tobacco',
        brands: Array.from(new Set(tobaccoBrands)),
        flavors: Array.from(new Set(tobaccoFlavors)),
        tobaccoWeights: Array.from(new Set(tobaccoWeights)),
      },
      {
        name: 'coals',
        brands: Array.from(new Set(coalBrands)),
        coalSizes: Array.from(new Set(coalSizes)),
        coalWeights: Array.from(new Set(coalWeights)),
      },
      {
        name: 'accessories',
        brands: Array.from(new Set(accessoryBrands)),
        types: Array.from(new Set(accessoryTypes)),
      },
    ];

    return productTabs;
  }
}
