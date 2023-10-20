import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Accessory } from '../../../accessories/entities/accessory.entity';

@Entity({ name: 'bowl_type' })
export class BowlType {
  @PrimaryGeneratedColumn({ name: 'bowl_type_id' })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @OneToMany(() => Accessory, accessory => accessory.bowl_type)
  accessories: Accessory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
