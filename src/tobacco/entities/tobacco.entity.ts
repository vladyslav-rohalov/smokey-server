import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'tobacco' })
export class Tobacco {
  @PrimaryGeneratedColumn({ name: 'tobacco_id' })
  id: number;

  @Column()
  flavor: string;

  @Column()
  weight: number;

  @Column({ nullable: true })
  strength: number;

  @OneToOne(() => Product, product => product.tobacco, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product;
}
