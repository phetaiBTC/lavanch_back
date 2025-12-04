import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { TieredPriceProps } from '../interface/tiered_price.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';

export class TieredPrice extends ShardEntity<TieredPriceProps> {
  private product_variant: ProductVariant;
  private unit: Unit;
  private min_quantity: number;
  private max_quantity?: number;
  private price_per_unit: number;
  private is_active: boolean;

  constructor(props: TieredPriceProps) {
    super(props);
    this.product_variant = props.product_variant;
    this.unit = props.unit;
    this.min_quantity = props.min_quantity;
    this.max_quantity = props.max_quantity;
    this.price_per_unit = props.price_per_unit;
    this.is_active = props.is_active ?? true;
  }

  get value() {
    return {
      id: this.id,
      product_variant: this.product_variant,
      unit: this.unit,
      min_quantity: this.min_quantity,
      max_quantity: this.max_quantity,
      price_per_unit: this.price_per_unit,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(
    props: Partial<
      Omit<TieredPriceProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new TieredPrice({ ...this.value, ...props });
  }
}
