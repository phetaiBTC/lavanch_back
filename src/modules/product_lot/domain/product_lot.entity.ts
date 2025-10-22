import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ProductLotProps } from '../interface/product_lot.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Currencies } from 'src/modules/currencies/domain/currencies.entity';

export class ProductLot extends ShardEntity<ProductLotProps> {
  private product_variant: ProductVariant;
  private lot_number: string;
  private manufacture_date?: Date;
  private expiry_date?: Date;
  //   branch: Branch;
  private quantity: number;
  private cost_price_local: number;
  private cost_currency: Currencies | null;
  private cost_price_original: number;
  private fx_rate: number;

  constructor(props: ProductLotProps) {
    super(props);
    this.product_variant = props.product_variant;
    this.lot_number = props.lot_number;
    this.manufacture_date = props.manufacture_date;
    this.expiry_date = props.expiry_date;
    // this.branch = props.branch;
    this.quantity = props.quantity ?? 0;
    this.cost_price_local = props.cost_price_local;
    this.cost_currency = props.cost_currency;
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
      cost_currency: this.cost_currency,
      cost_price_original: this.cost_price_original,
      fx_rate: this.fx_rate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(
    props: Partial<
      Omit<ProductLotProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new ProductLot({
      ...this.value,
      ...props,
    });
  }
}
