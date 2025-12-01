import { ProductResponse } from 'src/modules/product/interface/product.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { ProductVariantResponse } from 'src/modules/product_variant/interface/product_variant.interface';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { UnitResponse } from 'src/modules/unit/interface/unit.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface ProductPointProps extends ShardInterfaceProps {
  product_variant: ProductVariant | null;
  unit: Unit | null;
  points_per_unit?: number;
  is_active?: boolean;
  effective_date: Date;
}
export interface ProductPointResponse extends ShardInterfaceResponse {
  product_variant: ProductVariantResponse | null;
  unit: UnitResponse | null;
  points_per_unit?: number;
  is_active?: boolean;
  effective_date: Date;
}
