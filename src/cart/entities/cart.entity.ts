import { Entity, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { OneToMany, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  id: number;

  @OneToOne(() => User, user => user.cart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => CartItem, item => item.cart)
  items: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
