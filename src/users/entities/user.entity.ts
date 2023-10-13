import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { OneToOne, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ReviewRating } from '../../review-rating/entities/review-rating.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToOne(() => Address, address => address.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @OneToOne(() => Cart, cart => cart.user)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Favorite, favarite => favarite.user)
  favorites: Favorite[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => ReviewRating, rating => rating.user)
  reviewRatings: ReviewRating[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
