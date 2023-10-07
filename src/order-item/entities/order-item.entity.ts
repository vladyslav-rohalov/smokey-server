import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn({ name: 'item_id' })
  id: number;

  @Column()
  quantity: number;

  @Column()
  buyingPrice: number;

  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @ManyToOne(() => Product, product => product.cartItems)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
