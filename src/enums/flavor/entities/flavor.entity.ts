import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Tobacco } from '../../../tobacco/entities/tobacco.entity';

@Entity({ name: 'flavor' })
export class Flavor {
  @PrimaryGeneratedColumn({ name: 'flavor_id' })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @OneToMany(() => Tobacco, tobacco => tobacco.flavor)
  tobacco: Tobacco[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
