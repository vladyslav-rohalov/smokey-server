import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { OneToOne, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  v_code: string[] | null;

  @Column({ type: 'boolean', default: false })
  isVerify: boolean;

  @OneToOne(() => Address, address => address.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @OneToOne(() => Cart, cart => cart.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;

  @OneToMany(() => Order, order => order.user, {
    onDelete: 'CASCADE',
  })
  orders: Order[];

  @OneToMany(() => Favorite, favarite => favarite.user, {
    onDelete: 'CASCADE',
  })
  favorites: Favorite[];

  @OneToMany(() => Review, review => review.user, {
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
