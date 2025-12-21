import { Inbound_order_items } from './inbound_order_items.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const INBOUND_ORDER_ITEMS_REPOSITORY = Symbol('INBOUND_ORDER_ITEMS_REPOSITORY');
export interface IInbound_order_itemsRepository extends IBaseRepository<Inbound_order_items> {}