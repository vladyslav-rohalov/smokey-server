import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';

enum OrderStatus {
  PENDING = 'order pending',
  PROCESSING = 'order processing',
  SHIPPED = 'order shipped',
  COMPLETED = 'order completed',
  CANCELLED = 'corder cancelled',
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

  @Column()
  quantity: number;

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
