import { EntityManager } from "typeorm";
import { InboundOrder } from "./inbound-order.entity";

export const INBOUND_ORDER_REPOSITORY = Symbol('INBOUND_ORDER_REPOSITORY');
export interface IInboundOrderRepository {
  save(manager: EntityManager, domain: InboundOrder): Promise<void>;
  loadById(manager: EntityManager, id: number): Promise<InboundOrder | null>;
  
}
