import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn({ name: 'favorite_id' })
  id: number;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToOne(() => Product, product => product.favorites)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
