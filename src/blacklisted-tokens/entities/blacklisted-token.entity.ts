import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn } from 'typeorm';

@Entity({ name: 'blacklisted-tokens' })
export class BlacklistedToken {
  @PrimaryGeneratedColumn({ name: 'bltoken_id' })
  id: number;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}
