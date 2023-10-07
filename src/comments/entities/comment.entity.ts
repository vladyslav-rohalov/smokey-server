import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => Review, review => review.comments)
  review: Review;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
