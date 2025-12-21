import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { BranchesOrm } from './branches.orm-entity';
import { UserOrm } from './user.orm-entity';
import { Stock_transfer_itemsOrm } from './stock_transfer_items.orm-entity';

export enum StockTransferStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS',
}

@Entity('stock_transfers')
export class Stock_transfersOrm extends ShardOrm {
  @ManyToOne(() => BranchesOrm, (branch) => branch.stock_transfers_from, {
    nullable: false,
  })
  from_branch: BranchesOrm;

  @ManyToOne(() => BranchesOrm, (branch) => branch.stock_transfers_to, {
    nullable: false,
  })
  to_branch: BranchesOrm;

  @Column()
  transfer_date: Date;

  @Column({ type: 'enum', enum: StockTransferStatus })
  status: StockTransferStatus;

  @ManyToOne(() => UserOrm, (user) => user.stock_transfers, {
    nullable: false,
  })
  created_by: UserOrm;

  @OneToMany(()=> Stock_transfer_itemsOrm, (stock_transfer_items) => stock_transfer_items.stock_transfers)
  stock_transfer_items: Stock_transfer_itemsOrm[]
}
