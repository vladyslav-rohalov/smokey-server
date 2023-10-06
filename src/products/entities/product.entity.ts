import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Order } from '../../orders/entities/order.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Hookah } from '../../hookahs/entities/hookah.entity';
import { Tobacco } from '../../tobacco/entities/tobacco.entity';
import { Coal } from '../../coals/entities/coal.entity';
import { Accessory } from '../../accessories/entities/accessory.entity';

enum Promotion {
  HOT = 'hot',
  SALE = 'sale',
  NEW = 'new',
  None = 'none',
}

enum Status {
  IN_STOCK = 'in stock',
  OUT_OF_STOCK = 'out of stock',
  ENDING = 'ending',
  AWAITING = 'awaiting',
}

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column({ type: 'enum', enum: Promotion, default: Promotion.None })
  promotion: Promotion;

  @Column({ type: 'enum', enum: Status, default: Status.IN_STOCK })
  status: Status;

  @Column({ type: 'varchar', array: true })
  images: string[];

  @Column()
  price: number;

  @Column()
  descriptiom: string;

  @Column()
  brand: string;

  @Column()
  title: string;

  @Column()
  available: number;

  @Column()
  rating: number;

  @ManyToMany(() => Hookah, hookah => hookah.product)
  @JoinColumn({ name: 'hookah_id', referencedColumnName: 'id' })
  hookah: Hookah;

  @ManyToMany(() => Tobacco, tobacco => tobacco.product)
  @JoinColumn({ name: 'tobacco', referencedColumnName: 'id' })
  tobacco: Tobacco;

  @ManyToMany(() => Coal, coal => coal.product)
  @JoinColumn({ name: 'coal_id', referencedColumnName: 'id' })
  coal: Coal;

  @ManyToMany(() => Accessory, accessory => accessory.product)
  @JoinColumn({ name: 'accessory_id', referencedColumnName: 'id' })
  accessory: Accessory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
