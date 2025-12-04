import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { PriceHistoryProps } from '../interface/price_history.interface';
import { User } from 'src/modules/user/domain/user.entity';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';

export class PriceHistory extends ShardEntity<PriceHistoryProps> {
  private change_date?: Date;
  private product_variant: ProductVariant | null;
  private unit: Unit | null;
  private old_cost_price?: number;
  private new_cost_price?: number;
  private old_selling_price?: number;
  private new_selling_price?: number;
  private changed_by: User | null;
  private reason?: string;

  constructor(props: PriceHistoryProps) {
    super(props);
    this.product_variant = props.product_variant || null;
    this.unit = props.unit || null;
    this.old_cost_price = props.old_cost_price;
    this.new_cost_price = props.new_cost_price;
    this.old_selling_price = props.old_selling_price;
    this.new_selling_price = props.new_selling_price;
    this.changed_by = props.changed_by;
    this.change_date = props.change_date ?? new Date();
    this.reason = props.reason;
  }

  get value() {
    return {
      id: this.id,
      product_variant: this.product_variant,
      unit: this.unit,
      old_cost_price: this.old_cost_price,
      new_cost_price: this.new_cost_price,
      old_selling_price: this.old_selling_price,
      new_selling_price: this.new_selling_price,
      changed_by: this.changed_by,
      change_date: this.change_date,
      reason: this.reason,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  //   update(props: Partial<Omit<PriceHistoryProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>>): PriceHistory {
  //     return new PriceHistory({
  //       ...this.value,
  //       ...props,
  //     });
  //   }
}
