import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return await this.promotionRepository.save(promotion);
  }

  async findAll() {
    const promotions = await this.promotionRepository.find();
    return promotions;
  }

  async getPromotion(promotionDto: string) {
    const promotion = await this.promotionRepository.findOne({
      where: { promotion: promotionDto },
    });
    return promotion;
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionRepository.findOne({
      where: { id },
    });
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    await this.promotionRepository.update(id, updatePromotionDto);

    const updatedPromotion = await this.promotionRepository.findOne({
      where: { id },
    });

    return updatedPromotion;
  }

  async remove(id: number) {
    const promotion = await this.promotionRepository.findOne({
      where: { id },
    });
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    await this.promotionRepository.remove(promotion);
  }
}
