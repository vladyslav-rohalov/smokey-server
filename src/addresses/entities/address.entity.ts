import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { JoinColumn, ManyToOne } from 'typeorm';
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

  @Column({ nullable: true })
  apartment: string;

  @OneToOne(() => User, user => user.address)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
