import { Entity, Column, OneToMany } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { BranchExpensesOrm } from './branch_expenses.orm-entity';

@Entity('expense_categories')
export class ExpenseCategoriesOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => BranchExpensesOrm, (expense) => expense.expense_category)
  expenses: BranchExpensesOrm[];
}
