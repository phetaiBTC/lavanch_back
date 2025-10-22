import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ProductPointProps } from '../interface/product_point.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';

export class ProductPoint extends ShardEntity<ProductPointProps> {
  private product_variant: ProductVariant | null;
  private unit: Unit | null;
  private points_per_unit: number;
  private is_active: boolean;
  private effective_date: Date;

  constructor(props: ProductPointProps) {
    super(props);
    this.product_variant = props.product_variant ?? null;
    this.unit = props.unit ?? null;
    this.points_per_unit = props.points_per_unit ?? 0;
    this.is_active = props.is_active ?? true;
    this.effective_date = props.effective_date;
  }

  get value() {
    return {
      id: this.id,
      product_variant: this.product_variant,
      unit: this.unit,
      points_per_unit: this.points_per_unit,
      is_active: this.is_active,
      effective_date: this.effective_date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(
    props: Partial<
      Omit<ProductPointProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new ProductPoint({
      ...this.value,
      ...props,
    });
  }
}
