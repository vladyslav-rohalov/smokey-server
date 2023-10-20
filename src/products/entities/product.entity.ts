import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OneToMany, OneToOne } from 'typeorm';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Hookah } from '../../hookahs/entities/hookah.entity';
import { Tobacco } from '../../tobacco/entities/tobacco.entity';
import { Coal } from '../../coals/entities/coal.entity';
import { Accessory } from '../../accessories/entities/accessory.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';

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

  @Column({ type: 'varchar', array: true, nullable: true })
  images: string[] | null;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  brand: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'smallint' })
  available: number;

  @Column({ type: 'smallint', nullable: true })
  rating: number;

  @OneToMany(() => Favorite, favorite => favorite.product)
  favorites: Favorite[];

  @OneToMany(() => CartItem, item => item.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, item => item.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, review => review.product)
  reviews: Review;

  @OneToOne(() => Hookah, hookah => hookah.products, { cascade: true })
  hookahs: Hookah;

  @OneToOne(() => Tobacco, tobacco => tobacco.products, { cascade: true })
  tobacco: Tobacco;

  @OneToOne(() => Coal, coal => coal.products, { cascade: true })
  coals: Coal;

  @OneToOne(() => Accessory, accessory => accessory.products, {
    cascade: true,
  })
  accessories: Accessory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
