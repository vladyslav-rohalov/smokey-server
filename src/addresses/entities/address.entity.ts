import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  id: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house: string;

  @Column()
  appartment: string;

  @ManyToMany(() => User, user => user.address)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
