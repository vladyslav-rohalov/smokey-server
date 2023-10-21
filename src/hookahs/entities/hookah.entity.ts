import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { HookahSize } from '../../enums/hookah-size/entities/hookah-size.entity';
import { Color } from '../../enums/color/entities/color.entity';

@Entity({ name: 'hookahs' })
export class Hookah {
  @PrimaryGeneratedColumn({ name: 'hookah_id' })
  id: number;

  @ManyToOne(() => Color, color => color.hookahs)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @ManyToOne(() => HookahSize, hookahSize => hookahSize.hookahs)
  @JoinColumn({ name: 'hookah_size_id' })
  hookah_size: HookahSize;

  @OneToOne(() => Product, product => product.hookahs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product;
}
