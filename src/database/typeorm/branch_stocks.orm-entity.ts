import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { ProductVariantOrm } from './product-variant.orm-entity';
import { BranchesOrm } from './branches.orm-entity';
@Entity('branch_stocks')
export class BranchStockOrm extends ShardOrm {
  @Column() quantity: number;
  @ManyToOne(
    () => ProductVariantOrm,
    (ProductVariant) => ProductVariant.branch_stocks,
  )
  product_variant: ProductVariantOrm;
  @ManyToOne(() => BranchesOrm, (branch) => branch.branch_stocks)
  branch: BranchesOrm;

  @Column()
  reserved_quantity: number;
}
