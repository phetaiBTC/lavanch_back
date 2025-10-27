import { ProductPrice } from './product_price.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const PRODUCT_PRICE_REPOSITORY = Symbol('PRODUCT_PRICE_REPOSITORY');

export interface IProductPriceRepository
  extends IBaseRepository<ProductPrice> {
    findByUniqueCombination(
      product_variant_id: number,
      unit_id: number,
      effective_date: Date,
    ): Promise<ProductPrice | null>;
  }
