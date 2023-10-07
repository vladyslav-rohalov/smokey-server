import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'tobacco' })
export class Tobacco {
  @PrimaryGeneratedColumn({ name: 'tobacco_id' })
  id: number;

  @Column()
  flavor: string;

  @Column()
  weight: number;

  @Column()
  strength: number;

  @ManyToMany(() => Product, product => product.tobacco)
  products: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
