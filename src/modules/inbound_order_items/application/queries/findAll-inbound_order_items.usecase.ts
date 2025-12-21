
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDER_ITEMS_REPOSITORY,
    type IInbound_order_itemsRepository,
  } from '../../domain/inbound_order_items.repository';
  import { Inbound_order_items } from '../../domain/inbound_order_items.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindInbound_order_itemsUseCase {
  constructor(
 @Inject(INBOUND_ORDER_ITEMS_REPOSITORY)
      private readonly inbound_order_itemsRepository: IInbound_order_itemsRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Inbound_order_items>> {
    return await this.inbound_order_itemsRepository.findAll(query);
  }
}
  
  