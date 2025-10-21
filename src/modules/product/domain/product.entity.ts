import { ShardEntity } from 'src/shared/entity/base.entity';
import { ProductProps } from '../interface/product.interface';
import { Category } from 'src/modules/category/domain/category.entity';

export class Product extends ShardEntity<ProductProps> {
  name: string;
  brand: string;
  category?: Category | null;
  description?: string;
  barcode?: string;
  is_active: boolean;

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
}
