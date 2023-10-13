import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { JoinColumn, OneToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'coals' })
export class Coal {
  @PrimaryGeneratedColumn({ name: 'tobacco_id' })
  id: number;

  @Column()
  size: number;

  @Column()
  weight: number;

  @OneToOne(() => Product, product => product.coals, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product;
}
