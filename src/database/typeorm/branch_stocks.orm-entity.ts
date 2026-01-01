import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { BranchesOrm } from './branches.orm-entity';
import { ProductVariantOrm } from './product-variant.orm-entity';

@Entity('branch_stocks')
export class Branch_stocksOrm extends ShardOrm {
  @ManyToOne(() => BranchesOrm, (branch) => branch.branch_stocks, { nullable: false })
  branch: BranchesOrm;
  @ManyToOne(()=> ProductVariantOrm, (variant) => variant.branch_stocks)
  variant: ProductVariantOrm;
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @Column({ type: 'int', default: 0 })
  reserved_quantity:number
}
