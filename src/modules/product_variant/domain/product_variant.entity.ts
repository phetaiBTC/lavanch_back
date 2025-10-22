import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ProductVariantProps } from '../interface/product_variant.interface';
import { Product } from 'src/modules/product/domain/product.entity';

export class ProductVariant extends ShardEntity<ProductVariantProps> {
  name: string;
  sku?: string;
  barcode?: string;
  product: Product | null;
  is_active: boolean;

  constructor(props: ProductVariantProps) {
    super(props);
    this.name = props.name;
    this.sku = props.sku;
    this.barcode = props.barcode;
    this.product = props.product || null;
    this.is_active = props.is_active ?? true;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      sku: this.sku,
      barcode: this.barcode,
      product: this.product,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
