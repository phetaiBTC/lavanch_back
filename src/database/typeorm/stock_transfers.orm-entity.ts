import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { BranchesOrm } from './branches.orm-entity';
import { UserOrm } from './user.orm-entity';
export enum StatusStockTransfer {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}
@Entity('stock_transfers')
export class StockTransfersOrm extends ShardOrm {
  @ManyToOne(() => UserOrm, (user) => user.stock_transfers)
  user: UserOrm;

  @ManyToOne(() => BranchesOrm, (branch) => branch.stock_transfers_from)
  from_branch: BranchesOrm;

  @ManyToOne(() => BranchesOrm, (branch) => branch.stock_transfers_to)
  to_branch: BranchesOrm;

  @Column({
    type: 'enum',
    enum: StatusStockTransfer,
    nullable: false,
  })
  status: StatusStockTransfer;
}
