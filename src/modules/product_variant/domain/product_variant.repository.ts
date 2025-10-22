import { ProductVariant } from './product_variant.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const PRODUCT_VARIANT_REPOSITORY = Symbol('PRODUCT_VARIANT_REPOSITORY');
export interface IProductVariantRepository extends IBaseRepository<ProductVariant> {}
