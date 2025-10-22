import { ProductUnit } from './product_unit.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const PRODUCT_UNIT_REPOSITORY = Symbol('PRODUCT_UNIT_REPOSITORY');
export interface IProductUnitRepository extends IBaseRepository<ProductUnit> {
  findByProductVariantAndUnit(
    product_variant_id: number,
    unit_id: number,
  ): Promise<ProductUnit | null>;
}
