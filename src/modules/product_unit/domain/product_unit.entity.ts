import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { ProductUnitProps } from '../interface/product_unit.interface';

export class ProductUnit extends ShardEntity<ProductUnitProps> {
  product_variant: ProductVariant | null;
  unit: Unit | null;
  quantity_per_unit: number;
  is_base_unit: boolean;

  constructor(props: ProductUnitProps) {
    super(props);
    this.product_variant = props.product_variant || null;
    this.unit = props.unit || null;
    this.quantity_per_unit = props.quantity_per_unit ?? 0;
    this.is_base_unit = props.is_base_unit ?? false;
  }

  get value() {
    return {
      id: this.id,
      product_variant: this.product_variant,
      unit: this.unit,
      quantity_per_unit: this.quantity_per_unit,
      is_base_unit: this.is_base_unit,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
