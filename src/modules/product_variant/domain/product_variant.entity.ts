import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ProductVariantProps } from '../interface/product_variant.interface';
import { Product } from 'src/modules/product/domain/product.entity';

export class ProductVariant extends ShardEntity<ProductVariantProps> {
  private readonly name: string;
  private readonly sku?: string;
  private readonly barcode?: string;
  private readonly product: Product | null;
  private readonly is_active: boolean;

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

  public activate(is_active: boolean) {
    (this as any).is_active = is_active;
  }

  update(
    props: Partial<
      Omit<ProductVariantProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new ProductVariant({
      ...this.value,
      ...props,
    });
  }
}
