import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, user => user.cart)
  user: User;

  @OneToMany(() => CartItem, item => item.cart)
  items: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
