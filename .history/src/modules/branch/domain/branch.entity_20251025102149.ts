import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToMany, 
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';
import { Shift } from './shift.entity';
import { WalletTransaction } from './wallet-transaction.entity';
import { BranchExpense } from './branch-expense.entity';
import { WalletAdjustment } from './wallet-adjustment.entity';

@Entity('branches')
@Index(['village_id'])
@Index(['shifts_id'])
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'int', nullable: true })
  village_id: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tiktok: string;

  @Column({ type: 'int', nullable: true })
  shifts_id: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, nullable: false })
  wallet_balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Shift, (shift) => shift.branches)
  @JoinColumn({ name: 'shifts_id' })
  shift: Shift;

  @OneToMany(() => WalletTransaction, (transaction) => transaction.branch)
  wallet_transactions: WalletTransaction[];

  @OneToMany(() => WalletTransaction, (transaction) => transaction.relatedBranch)
  related_transactions: WalletTransaction[];

  @OneToMany(() => BranchExpense, (expense) => expense.branch)
  expenses: BranchExpense[];

  @OneToMany(() => WalletAdjustment, (adjustment) => adjustment.branch)
  wallet_adjustments: WalletAdjustment[];
}