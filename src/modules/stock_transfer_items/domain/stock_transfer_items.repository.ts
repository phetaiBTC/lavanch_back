import { Stock_transfer_items } from './stock_transfer_items.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const STOCK_TRANSFER_ITEMS_REPOSITORY = Symbol('STOCK_TRANSFER_ITEMS_REPOSITORY');
export interface IStock_transfer_itemsRepository extends IBaseRepository<Stock_transfer_items> {}