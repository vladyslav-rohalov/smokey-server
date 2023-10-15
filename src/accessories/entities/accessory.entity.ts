import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

export enum Type {
  BOWL = 'bowl',
  HOSE = 'hose',
  TONGS = 'tongs',
  CAP = 'cap',
  COAL_HOLDER = 'charcoal holder',
  SEALS = 'seals',
  CLEANERS = 'cleaners',
  FLASK = 'flask',
  OTHER = 'other',
}

export enum Bowl_Type {
  TURKISH = 'turkish',
  PHUNNEL = 'phunnel',
  VORTEX = 'vortex',
  EVIL = 'evil',
}

@Entity({ name: 'accessories' })
export class Accessory {
  @PrimaryGeneratedColumn({ name: 'accessory_id' })
  id: number;

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @Column({ type: 'enum', enum: Bowl_Type, nullable: true })
  bowl_type: Bowl_Type | null;

  @OneToOne(() => Product, product => product.accessories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product;
}
