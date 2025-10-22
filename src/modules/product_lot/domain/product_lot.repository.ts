import { ProductLot } from './product_lot.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const PRODUCT_LOT_REPOSITORY = Symbol('PRODUCT_LOT_REPOSITORY');
export interface IProductLotRepository extends IBaseRepository<ProductLot> {}
