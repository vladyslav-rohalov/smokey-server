import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

// quantity ???
@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  id: number;

  @Column()
  quantity: number;

  @OneToOne(() => User, user => user.cart)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
