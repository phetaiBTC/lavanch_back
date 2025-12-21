
  import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDER_ITEMS_REPOSITORY,
    type IInbound_order_itemsRepository,
  } from '../../domain/inbound_order_items.repository';
  import { CreateInbound_order_itemsDto } from '../../dto/create-inbound_order_items.dto';
  import { Inbound_order_items } from '../../domain/inbound_order_items.entity';

  @Injectable()
  export class CreateInbound_order_itemsUseCase {
    constructor(
      @Inject(INBOUND_ORDER_ITEMS_REPOSITORY)
      private readonly inbound_order_itemsRepository: IInbound_order_itemsRepository,
    ) {}

    async execute(body: CreateInbound_order_itemsDto): Promise<Inbound_order_items> {
      const inbound_order_items = new Inbound_order_items({
        name: body.name,
      });
      return await this.inbound_order_itemsRepository.save(inbound_order_items);
    }
  }
