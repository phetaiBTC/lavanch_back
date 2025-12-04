import { TieredPrice } from './tiered_price.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const TIERED_PRICE_REPOSITORY = Symbol('TIERED_PRICE_REPOSITORY');
export interface ITieredPriceRepository extends IBaseRepository<TieredPrice> {}
