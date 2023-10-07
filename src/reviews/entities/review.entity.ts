import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ReviewRating } from '../../review-rating/entities/review-rating.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  id: number;

  @Column()
  text: string;

  @Column()
  pros: string;

  @Column()
  cons: string;

  @Column({ type: 'varchar', array: true })
  images: string[];

  @Column()
  rating: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @OneToMany(() => Comment, comment => comment.review)
  comments: Comment[];

  @OneToMany(() => ReviewRating, rating => rating.review)
  reviewRatings: Review[];

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
