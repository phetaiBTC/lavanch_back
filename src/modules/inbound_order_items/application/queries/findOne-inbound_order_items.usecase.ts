
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    INBOUND_ORDER_ITEMS_REPOSITORY,
    type IInbound_order_itemsRepository,
  } from '../../domain/inbound_order_items.repository';
  import { Inbound_order_items } from '../../domain/inbound_order_items.entity';

@Injectable()
export class FindOneInbound_order_itemsUseCase {
  constructor(
 @Inject(INBOUND_ORDER_ITEMS_REPOSITORY)
      private readonly inbound_order_itemsRepository: IInbound_order_itemsRepository,
  ) {}

  async execute(id: number): Promise<Inbound_order_items> {
    const inbound_order_items = await this.inbound_order_itemsRepository.findById(id);
    if (!inbound_order_items) {
      throw new NotFoundException('Inbound_order_items not found');
    }
    return inbound_order_items;
  }
}
  
  