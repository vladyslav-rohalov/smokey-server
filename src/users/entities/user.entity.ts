import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
// import { Review } from '../../reviews/entities/review.entity';

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

  @Column()
  role: string;

  @Column('jsonb', { nullable: true })
  address: { city: string; street: string; house: string; apartment: string };

  @Column('jsonb', { nullable: true })
  cart: { productId: number; quantity: number }[];

  @Column('int', { array: true, default: [] })
  favorites: number[];

  @OneToMany(() => Order, order => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Order[];

  //   @OneToMany(type => Review, review => review.user)
  //  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
