import { ShardEntity } from 'src/shared/entity/base.entity';
import { ProductLotProps } from '../interface/product_lot.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';

export class ProductLot extends ShardEntity<ProductLotProps> {
  product_variant: ProductVariant;
  lot_number: string;
  manufacture_date?: Date;
  expiry_date?: Date;
//   branch: Branch;
  quantity: number;
  cost_price_local: number;
//   cost_currency: Currency;
  cost_price_original: number;
  fx_rate: number;

  constructor(props: ProductLotProps) {
    super(props);
    this.product_variant = props.product_variant;
    this.lot_number = props.lot_number;
    this.manufacture_date = props.manufacture_date;
    this.expiry_date = props.expiry_date;
    // this.branch = props.branch;
    this.quantity = props.quantity ?? 0;
    this.cost_price_local = props.cost_price_local;
    // this.cost_currency = props.cost_currency;
    this.cost_price_original = props.cost_price_original;
    this.fx_rate = props.fx_rate;
  }

  get value() {
    return {
      id: this.id,
      product_variant: this.product_variant,
      lot_number: this.lot_number,
      manufacture_date: this.manufacture_date,
      expiry_date: this.expiry_date,
    //   branch: this.branch,
      quantity: this.quantity,
      cost_price_local: this.cost_price_local,
    //   cost_currency: this.cost_currency,
      cost_price_original: this.cost_price_original,
      fx_rate: this.fx_rate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
