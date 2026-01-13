import { Injectable } from '@nestjs/common';
import { InboundOrder } from '../domain/inbound-order.entity';
import { Inbound_ordersOrm } from 'src/database/typeorm/inbound_orders.orm-entity';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { InboundOrderItem } from '../domain/inbound-order-item.entity';
import { Inbound_order_itemsOrm } from 'src/database/typeorm/inbound_order_items.orm-entity';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';

@Injectable()
export class InboundOrderMapper {
  toDomainItem(schema: Inbound_order_itemsOrm): InboundOrderItem {
    return new InboundOrderItem({
      id: schema.id,
      productVariantId: schema.variant.id,
      unitId: schema.unit.id,
      quantity: schema.quantity,
      unitPrice: schema.unit_price,
      receivedQuantity: schema.received_quantity,
    });
  }

  toDomain(schema: Inbound_ordersOrm): InboundOrder {
    return new InboundOrder({
      id: schema.id,
      supplier_id: schema.supplier.id,
      branch_id: schema.branch.id,
      currency_id: schema.currency.id,
      created_by: schema.created_by.id,
      expected_date: schema.expected_date,
      order_date: schema.order_date,
      status: schema.status,
      items: schema.inbound_order_items.map((i) => this.toDomainItem(i)),
    });
  }

  toSchema(
    domain: InboundOrder,
    orm: {
      supplier: SuppliersOrm;
      branch: BranchesOrm;
      currency: CurrenciesOrm;
      created_by: UserOrm;
    },
  ): Partial<Inbound_ordersOrm> {
    return {
      id: domain.id,
      supplier: orm.supplier,
      branch: orm.branch,
      currency: orm.currency,
      created_by: orm.created_by,
      expected_date: domain.expectedDate,
      order_date: domain.orderDate,
      status: domain.status,
      total_amount: domain.totalAmount,
    };
  }
  toSchemaItem(
    domain: InboundOrderItem,
    orm: {
      inbound_orders: Inbound_ordersOrm;
      variant: ProductVariantOrm;
      unit: UnitOrm;
      lot?: ProductLotOrm;
    },
  ): Partial<Inbound_order_itemsOrm> {
    // console.log(domain.totalPrice)
    return {
      id: domain.id,
      inbound_orders: orm.inbound_orders,
      variant: orm.variant,
      unit: orm.unit,
      product_lot: orm.lot,
      quantity: domain.getQuantity,
      unit_price: domain.getUnitPrice,
      total_price: domain.totalPrice,
      total_pieces: domain.totalPieces,
      received_quantity: domain.getReceivedQuantity,
    };
  }
}
