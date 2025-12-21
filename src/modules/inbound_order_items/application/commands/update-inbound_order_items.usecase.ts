
  import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDER_ITEMS_REPOSITORY,
    type IInbound_order_itemsRepository,
  } from '../../domain/inbound_order_items.repository';
  import { CreateInbound_order_itemsDto } from '../../dto/create-inbound_order_items.dto';
  import { Inbound_order_items } from '../../domain/inbound_order_items.entity';
import { FindOneInbound_order_itemsUseCase } from '../queries/findOne-inbound_order_items.usecase';

  import { UpdateInbound_order_itemsDto } from '../../dto/update-inbound_order_items.dto';

  @Injectable()
  export class UpdateInbound_order_itemsUseCase {
    constructor(
      @Inject(INBOUND_ORDER_ITEMS_REPOSITORY)
      private readonly inbound_order_itemsRepository: IInbound_order_itemsRepository,
      private readonly inbound_order_itemsGetOne: FindOneInbound_order_itemsUseCase,
    ) {}

    async execute(id: number, body: UpdateInbound_order_itemsDto): Promise<Inbound_order_items> {
      const inbound_order_items = await this.inbound_order_itemsGetOne.execute(id);
      const update = inbound_order_items.update({
        name: body.name,
      });
      return await this.inbound_order_itemsRepository.save(update);
    }
  }