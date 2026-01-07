import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { BranchesOrm } from './branches.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { ProductLotOrm } from './product_lot.orm-entity';
import { UserOrm } from './user.orm-entity';

export enum StockMovementType {
  INBOUND = 'INBOUND',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  ADJUSTMENT = 'ADJUSTMENT',  
}

@Entity('stock_movements')
export class Stock_movementsOrm extends ShardOrm {
  @ManyToOne(() => BranchesOrm, (branch) => branch.stock_movements)
  branch: BranchesOrm;
  @ManyToOne(() => ProductVariantOrm, (variant) => variant.stock_transfer_items)
  product_variant: ProductVariantOrm;
  @ManyToOne(() => ProductLotOrm, (lot) => lot.stock_transfer_items)
  product_lot: ProductLotOrm;
  @Column()
  reference_table: string;
  @Column()
  reference_id: number;
  @Column()
  movement_date: Date;
  @ManyToOne(() => UserOrm, (user) => user.stock_movements)
  created_by: UserOrm;

  @Column({ type: 'enum', enum: StockMovementType })
  movement_type: StockMovementType;

  @Column({ type: 'int' })
  quantity: number;
}
