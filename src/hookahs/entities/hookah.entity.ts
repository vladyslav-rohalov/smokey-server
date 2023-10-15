import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { JoinColumn, OneToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

export enum Size {
  BIG = 'big',
  MEDIUM = 'medium',
  SMALL = 'small',
  PORTABLE = 'portable',
}

@Entity({ name: 'hookahs' })
export class Hookah {
  @PrimaryGeneratedColumn({ name: 'hookah_id' })
  id: number;

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'enum', enum: Size })
  size: Size;

  @OneToOne(() => Product, product => product.hookahs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product;
}
