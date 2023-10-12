import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { OneToMany, JoinTable, OneToOne } from 'typeorm';
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

  @Column({ type: 'varchar', array: true })
  images: string[];

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  title: string;

  @Column()
  available: number;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => Favorite, favorite => favorite.product)
  favorites: Favorite[];

  @OneToMany(() => CartItem, item => item.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, item => item.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, review => review.product)
  reviews: Review;

  @ManyToMany(() => Hookah, hookah => hookah.products, { cascade: true })
  @JoinTable({
    name: 'hookah_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'hookah_id',
      referencedColumnName: 'id',
    },
  })
  hookahs: Hookah[];

  @OneToOne(() => Tobacco, tobacco => tobacco.products, { cascade: true })
  tobacco: Tobacco;

  @ManyToMany(() => Coal, coal => coal.products, { cascade: true })
  @JoinTable({
    name: 'coals_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'coal_id',
      referencedColumnName: 'id',
    },
  })
  coals: Coal;

  @ManyToMany(() => Accessory, accessory => accessory.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'accessories_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'accessory_id',
      referencedColumnName: 'id',
    },
  })
  accessory: Accessory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
