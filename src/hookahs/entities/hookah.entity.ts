import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

enum Size {
  BIG = 'big',
  MEDIUM = 'medium',
  SMALL = 'small',
  PORTABLE = 'portable',
}

@Entity({ name: 'hookahs' })
export class Hookah {
  @PrimaryGeneratedColumn({ name: 'hookah_id' })
  id: number;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: Size })
  size: Size;

  @ManyToMany(() => Product, product => product.hookahs)
  products: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
