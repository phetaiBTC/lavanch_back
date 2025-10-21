import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { BranchesOrm } from './branches.orm-entity';
import { ExpenseCategoriesOrm } from './expense_categories.orm-entity';
import { CurrenciesOrm } from './currencies.orm-entity';
import { UserOrm } from './user.orm-entity';
import { WalletTransactionsOrm } from './wallet_transactions.orm-entity';

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('branch_expenses')
export class BranchExpensesOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  expense_no: string;

  @Column({ nullable: false })
  branch_id: number;

  @ManyToOne(() => BranchesOrm, (branch) => branch.expenses, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchesOrm;

  @Column({ nullable: false })
  expense_category_id: number;

  @ManyToOne(() => ExpenseCategoriesOrm, (category) => category.expenses, { nullable: false })
  @JoinColumn({ name: 'expense_category_id' })
  expense_category: ExpenseCategoriesOrm;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;

  @Column({ default: 1 })
  currency_id: number;

  @ManyToOne(() => CurrenciesOrm, { nullable: true })
  @JoinColumn({ name: 'currency_id' })
  currency: CurrenciesOrm;

  @Column({ type: 'date', nullable: false })
  expense_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  receipt_image: string;

  @Column({ nullable: false })
  created_by: number;

  @ManyToOne(() => UserOrm, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  creator: UserOrm;

  @Column({ nullable: true })
  approved_by: number;

  @ManyToOne(() => UserOrm, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: UserOrm;

  @Column({ type: 'enum', enum: ExpenseStatus, default: ExpenseStatus.PENDING })
  status: ExpenseStatus;

  @Column({ nullable: true })
  wallet_transaction_id: number;

  @OneToOne(() => WalletTransactionsOrm, { nullable: true })
  @JoinColumn({ name: 'wallet_transaction_id' })
  wallet_transaction: WalletTransactionsOrm;
}
