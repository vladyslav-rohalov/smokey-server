import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELLED = 'canceled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  total: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => OrderItem, item => item.order)
  items: OrderItem[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
