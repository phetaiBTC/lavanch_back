import { Product } from 'src/modules/product/domain/product.entity';
import { ProductResponse } from 'src/modules/product/interface/product.interface';
import { ShardInterfaceProps, ShardInterfaceResponse } from 'src/shared/interface/Base.interface';


export interface ProductVariantProps extends ShardInterfaceProps {
  name: string;
  sku?: string;
  barcode?: string;
  product: Product | null;
  is_active: boolean;
}
export interface ProductVariantResponse extends ShardInterfaceResponse {
  name: string;
  sku?: string;
  barcode?: string;
  product?: ProductResponse  | null;
  is_active: boolean;
}
