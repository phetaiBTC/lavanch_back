import { Stock_adjustment_items } from './stock_adjustment_items.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const STOCK_ADJUSTMENT_ITEMS_REPOSITORY = Symbol('STOCK_ADJUSTMENT_ITEMS_REPOSITORY');
export interface IStock_adjustment_itemsRepository extends IBaseRepository<Stock_adjustment_items> {}