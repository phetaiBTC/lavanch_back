import { Inject, Injectable } from '@nestjs/common';
import {
  type IInboundOrderRepository,
  INBOUND_ORDER_REPOSITORY,
} from '../../domain/inbound-order.repository';
import { CreateInboundOrderDto } from '../../dto/create-inbound-order.dto';
import { AuthPayload } from 'src/modules/auth/interface/auth.interface';
import { InboundOrder } from '../../domain/inbound-order.entity';
import { TransactionService } from 'src/shared/utils/transaction.util';
import { InboundOrderItem } from '../../domain/inbound-order-item.entity';
import { InboundOrdersStatus } from 'src/database/typeorm/inbound_orders.orm-entity';

@Injectable()
export class CreateInboundOrderUseCase {
  constructor(
    @Inject(INBOUND_ORDER_REPOSITORY)
    private readonly repo: IInboundOrderRepository,
    private readonly tx: TransactionService,
  ) {}
  async execute(dto: CreateInboundOrderDto, user: AuthPayload) {
    return await this.tx.run(async (manager) => {
      const items = dto.items.map(
        (i) =>
          new InboundOrderItem({
            productVariantId: i.product_variant_id,
            unitId: i.unit_id,
            productLotId: i.product_lot_id,
            quantity: i.quantity,
            unitPrice: i.unit_price,
          }),
      );

      const order = new InboundOrder({
        supplier_id: dto.supplier_id,
        branch_id: dto.branch_id,
        currency_id: dto.currency_id,
        created_by: user.id,
        expected_date: dto.expected_date,
        order_date: dto.expected_date,
        items,
        status: InboundOrdersStatus.PENDING,
      });

      await this.repo.save(manager, order);

      return { message: 'Inbound order created successfully' };
    });
  }
}
