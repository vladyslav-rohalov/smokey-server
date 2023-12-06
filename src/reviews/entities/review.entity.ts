import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column()
  pros: string;

  @Column()
  cons: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  images: string[];

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  rating: number;

  @ManyToOne(() => User, user => user.reviews, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
