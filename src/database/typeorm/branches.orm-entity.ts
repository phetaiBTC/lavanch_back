import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { VillageOrm } from './village.orm-entity';
import { ShiftsOrm } from './shifts.orm-entity';
import { WalletTransactionsOrm } from './wallet_transactions.orm-entity';
import { BranchExpensesOrm } from './branch_expenses.orm-entity';
import { WalletAdjustmentsOrm } from './wallet_adjustments.orm-entity';
import { BranchStockOrm } from './branch_stocks.orm-entity';
import { StockTransfersOrm } from './stock_transfers.orm-entity';

@Entity('branches')
export class BranchesOrm extends ShardOrm {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;

  @Column({ nullable: true })
  village_id: number;

  @ManyToOne(() => VillageOrm, { nullable: true })
  @JoinColumn({ name: 'village_id' })
  village: VillageOrm;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tiktok: string;

  @Column({ nullable: true })
  shifts_id: number;

  @ManyToOne(() => ShiftsOrm, (shift) => shift.branches, { nullable: true })
  @JoinColumn({ name: 'shifts_id' })
  shift: ShiftsOrm;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: false,
  })
  wallet_balance: number;

  @OneToMany(() => WalletTransactionsOrm, (transaction) => transaction.branch)
  wallet_transactions: WalletTransactionsOrm[];

  @OneToMany(
    () => WalletTransactionsOrm,
    (transaction) => transaction.related_branch,
  )
  related_transactions: WalletTransactionsOrm[];

  @OneToMany(() => BranchExpensesOrm, (expense) => expense.branch)
  expenses: BranchExpensesOrm[];

  @OneToMany(() => WalletAdjustmentsOrm, (adjustment) => adjustment.branch)
  wallet_adjustments: WalletAdjustmentsOrm[];

  @OneToMany(() => BranchStockOrm, (stock) => stock.branch)
  branch_stocks: BranchStockOrm[];

  @OneToMany(() => StockTransfersOrm, (transfer) => transfer.from_branch)
  stock_transfers_from: StockTransfersOrm[];

  @OneToMany(() => StockTransfersOrm, (transfer) => transfer.to_branch)
  stock_transfers_to: StockTransfersOrm[];

} 
