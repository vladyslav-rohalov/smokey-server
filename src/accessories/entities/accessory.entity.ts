import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

enum Type {
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

enum Bowl_Type {
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

  @Column({ type: 'enum', enum: Bowl_Type })
  bowl_type: Bowl_Type;

  @ManyToMany(() => Product, product => product.accessory)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
