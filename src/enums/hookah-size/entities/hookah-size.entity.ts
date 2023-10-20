import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Hookah } from '../../../hookahs/entities/hookah.entity';

@Entity({ name: 'hookah_size' })
export class HookahSize {
  @PrimaryGeneratedColumn({ name: 'hookah_size_id' })
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Hookah, hookah => hookah.hookah_size)
  hookah_size: Hookah[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
