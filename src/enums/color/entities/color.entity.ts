import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Hookah } from '../../../hookahs/entities/hookah.entity';

@Entity({ name: 'color' })
export class Color {
  @PrimaryGeneratedColumn({ name: 'color_id' })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ unique: true, type: 'varchar' })
  value: string;

  @OneToMany(() => Hookah, hookah => hookah.color)
  hookahs: Hookah[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
