import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ProductPriceProps } from '../interface/product_price.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';

export class ProductPrice extends ShardEntity<ProductPriceProps> {
  private product_variant: ProductVariant;
  private unit: Unit;
  private cost_price: number;
  private selling_price: number;
  private min_price?: number;
  private is_active: boolean;
  private effective_date: Date;

  constructor(props: ProductPriceProps) {
    super(props);
    this.product_variant = props.product_variant;
    this.unit = props.unit;
    this.cost_price = props.cost_price;
    this.selling_price = props.selling_price;
    this.min_price = props.min_price;
    this.is_active = props.is_active ?? true;
    this.effective_date = props.effective_date;
  }

  get value() {
    return {
      id: this.id,
      product_variant: this.product_variant,
      unit: this.unit,
      cost_price: this.cost_price,
      selling_price: this.selling_price,
      min_price: this.min_price,
      is_active: this.is_active,
      effective_date: this.effective_date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(
    props: Partial<
      Omit<ProductPriceProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new ProductPrice({
      ...this.value,
      ...props,
    });
  }
}
