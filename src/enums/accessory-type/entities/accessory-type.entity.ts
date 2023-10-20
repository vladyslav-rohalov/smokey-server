import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Accessory } from '../../../accessories/entities/accessory.entity';

@Entity({ name: 'type' })
export class AccessoryType {
  @PrimaryGeneratedColumn({ name: 'type_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Accessory, accessory => accessory.type)
  type: Accessory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
