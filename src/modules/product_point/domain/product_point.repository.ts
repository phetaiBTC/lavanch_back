import { ProductPoint } from './product_point.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const PRODUCT_POINT_REPOSITORY = Symbol('PRODUCT_POINT_REPOSITORY');
export interface IProductPointRepository extends IBaseRepository<ProductPoint> {
  findByProductVariantAndUnit(
    product_variant_id: number,
    unit_id: number,
  ): Promise<ProductPoint | null>;
}
