import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity({ name: 'review_rating' })
export class ReviewRating {
  @PrimaryGeneratedColumn({ name: 'rating_id' })
  id: number;

  @Column()
  pros: number;

  @Column()
  cons: number;

  @ManyToOne(() => User, user => user.reviewRatings)
  user: User;

  @ManyToOne(() => Review, review => review.reviewRatings)
  review: Review;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
