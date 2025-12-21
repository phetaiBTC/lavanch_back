import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BranchesOrm } from './branches.orm-entity';
import { Stock_adjustment_itemsOrm } from './stock_adjustment_items.orm-entity';

export enum StockAdjustmentsStatus {
  PENDING = 'PENDING',
  APPROVED =  'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('stock_adjustments')
export class Stock_adjustmentsOrm extends ShardOrm {
  @ManyToOne(() => BranchesOrm, (branch) => branch.stock_movements)
  branch: BranchesOrm;

  @Column()
  adjustment_no: string;

  @Column()
  adjustment_date: Date;

  @Column({
    type: 'enum',
    enum: StockAdjustmentsStatus,
    default: StockAdjustmentsStatus.PENDING,
  })

  @Column()
  status: StockAdjustmentsStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(()=>Stock_adjustment_itemsOrm,(stock_adjustment_item)=>stock_adjustment_item.stock_adjustment)
  stock_adjustment_items:Stock_adjustment_itemsOrm[]
}
