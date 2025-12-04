import { Product } from 'src/modules/product/domain/product.entity';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { ProductVariantResponse } from 'src/modules/product_variant/interface/product_variant.interface';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { UnitResponse } from 'src/modules/unit/interface/unit.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface ProductPriceProps extends ShardInterfaceProps {
  product_variant: ProductVariant;
  unit: Unit;
  cost_price: number;
  selling_price: number;
  min_price?: number;
  is_active?: boolean;
  effective_date: Date;
}
export interface ProductPriceResponse extends ShardInterfaceResponse {
  product_variant: ProductVariantResponse | null;
  unit: UnitResponse | null;
  cost_price: number;
  selling_price: number;
  min_price?: number;
  is_active?: boolean;
  effective_date: Date;
}
