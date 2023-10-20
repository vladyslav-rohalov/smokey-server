import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from '../../../products/entities/product.entity';

@Entity({ name: 'brand' })
export class Brand {
  @PrimaryGeneratedColumn({ name: 'brand_id' })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @OneToMany(() => Product, product => product.brand)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
