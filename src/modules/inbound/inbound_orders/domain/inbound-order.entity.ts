import { InboundOrdersStatus } from 'src/database/typeorm/inbound_orders.orm-entity';
import { InboundOrderProps } from '../interface/inbound.interface';
import { InboundOrderItem } from './inbound-order-item.entity';
export interface ReceiveInboundOrderResult {
  itemId: number;
  productVariantId: number;
  productLotId?: number;
  receivedQuantity: number;
}

export class InboundOrder {
  readonly id?: number;

  readonly supplier_id: number;
  readonly branch_id: number;
  readonly currency_id: number;
  readonly created_by: number;
  readonly items: InboundOrderItem[];

  private _received_date: Date;
  private _expected_date: Date;
  private _order_date: Date;
  private _status: InboundOrdersStatus = InboundOrdersStatus.PENDING;

  constructor(props: InboundOrderProps) {
    this.id = props.id;
    this.supplier_id = props.supplier_id;
    this.branch_id = props.branch_id;
    this.currency_id = props.currency_id;
    this.created_by = props.created_by;
    this._expected_date = props.expected_date;
    this._order_date = props.order_date;
    this.items = props.items;
  }

  get receivedDate(): Date {
    return this._received_date;
  }

  get expectedDate(): Date {
    return this._expected_date;
  }

  get orderDate(): Date {
    return this._order_date;
  }

  get totalAmount(): number {
    return this.items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  get status(): InboundOrdersStatus {
    return this._status;
  }

  get getItems(): InboundOrderItem[] {
    return this.items;
  }

  complete() {
    this._status = InboundOrdersStatus.RECEIVED;
    this._received_date = new Date();
  }

  receiveItem(itemId: number, qty: number): ReceiveInboundOrderResult {
    // if (this.status !== InboundOrdersStatus.CONFIRMED) {
    //   throw new BadRequestException('Inbound order is not confirmed');
    // }

    const item = this.items.find((i) => i.id === itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }

    item.receive(qty);

    if (this.items.every((i) => i.isFullyReceived())) {
      this.complete();
    }

    return {
      itemId: item.id!,
      productVariantId: item.productVariantId,
      productLotId: item.productLotId,
      receivedQuantity: qty,
    };
  }
}
