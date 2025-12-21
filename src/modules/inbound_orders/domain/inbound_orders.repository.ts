import { Inbound_orders } from './inbound_orders.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';

export const INBOUND_ORDERS_REPOSITORY = Symbol('INBOUND_ORDERS_REPOSITORY');
export interface IInbound_ordersRepository extends IBaseRepository<Inbound_orders> {}