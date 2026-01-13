import { InboundOrdersStatus } from "src/database/typeorm/inbound_orders.orm-entity";
import { InboundOrderItem } from "../domain/inbound-order-item.entity";

export interface InboundOrderProps {
  id?: number;
  supplier_id: number;
  branch_id: number;
  currency_id: number;
  created_by: number;
  // received_date: Date;
  expected_date: Date;
  order_date: Date;
  // total_amount: number;
  status: InboundOrdersStatus;
  items: InboundOrderItem[];
}