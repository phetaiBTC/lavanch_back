import { ProductResponse } from 'src/modules/product/interface/product.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { ProductVariantResponse } from 'src/modules/product_variant/interface/product_variant.interface';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { UnitResponse } from 'src/modules/unit/interface/unit.interface';
import { ShardInterfaceProps, ShardInterfaceResponse } from "src/shared/BaseModule/interface/Base.interface";


export interface ProductUnitProps extends ShardInterfaceProps {
  product_variant: ProductVariant | null;
  unit: Unit | null;
  quantity_per_unit: number;
  is_base_unit: boolean;
}
export interface ProductUnitResponse extends ShardInterfaceResponse {
  product_variant: ProductVariantResponse | null;
  unit: UnitResponse | null;
  quantity_per_unit: number;
  is_base_unit: boolean;
}
