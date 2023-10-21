import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { AccessoryType } from '../../enums/accessory-type/entities/accessory-type.entity';
import { BowlType } from '../../enums/bowl-type/entities/bowl-type.entity';

@Entity({ name: 'accessories' })
export class Accessory {
  @PrimaryGeneratedColumn({ name: 'accessory_id' })
  id: number;

  @ManyToOne(() => AccessoryType, type => type.accessories)
  @JoinColumn({ name: 'type_id' })
  type: AccessoryType;

  @ManyToOne(() => BowlType, type => type.accessories)
  @JoinColumn({ name: 'bowl_type_id' })
  bowl_type: BowlType | null;

  @OneToOne(() => Product, product => product.accessories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product;
}
