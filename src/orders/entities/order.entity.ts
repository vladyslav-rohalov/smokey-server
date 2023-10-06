import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

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
  amount: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
