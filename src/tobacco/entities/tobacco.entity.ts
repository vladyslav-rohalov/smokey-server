import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Flavor } from '../../enums/flavor/entities/flavor.entity';

@Entity({ name: 'tobacco' })
export class Tobacco {
  @PrimaryGeneratedColumn({ name: 'tobacco_id' })
  id: number;

  @ManyToOne(() => Flavor, flavor => flavor.tobacco)
  @JoinColumn({ name: 'flavor_id' })
  flavor: Flavor;

  @Column({ type: 'smallint' })
  tobacco_weight: number;

  @Column({ type: 'smallint', nullable: true })
  strength: number;

  @OneToOne(() => Product, product => product.tobacco, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product;
}
