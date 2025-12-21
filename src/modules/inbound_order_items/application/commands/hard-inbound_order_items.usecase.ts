
import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDER_ITEMS_REPOSITORY,
    type IInbound_order_itemsRepository,
  } from '../../domain/inbound_order_items.repository';
import { FindOneInbound_order_itemsUseCase } from '../queries/findOne-inbound_order_items.usecase';


@Injectable()
export class HardDeleteInbound_order_itemsUseCase {
  constructor(
      @Inject(INBOUND_ORDER_ITEMS_REPOSITORY)
      private readonly inbound_order_itemsRepository: IInbound_order_itemsRepository,
      private readonly inbound_order_itemsGetOne: FindOneInbound_order_itemsUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.inbound_order_itemsGetOne.execute(id)));
    return await this.inbound_order_itemsRepository.hardDelete(id);
  }
}
  
  