import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ProductProps } from '../interface/product.interface';
import { Category } from 'src/modules/category/domain/category.entity';

export class Product extends ShardEntity<ProductProps> {
  private name: string;
  private brand: string;
  private category?: Category | null;
  private description?: string;
  private barcode?: string;
  private is_active: boolean;

  constructor(props: ProductProps) {
    super(props);
    this.name = props.name;
    this.brand = props.brand;
    this.category = props.category || null;
    this.description = props.description;
    this.barcode = props.barcode;
    this.is_active = props.is_active ?? true;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      category: this.category,
      description: this.description,
      barcode: this.barcode,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  update(
    props: Partial<
      Omit<ProductProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new Product({
      ...this.value,
      ...props,
    });
  }
}
