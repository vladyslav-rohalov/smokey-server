import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from '../../../products/entities/product.entity';

@Entity({ name: 'promotion' })
export class Promotion {
  @PrimaryGeneratedColumn({ name: 'promotion_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, product => product.promotion)
  promotion: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
