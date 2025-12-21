
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDERS_REPOSITORY,
    type IInbound_ordersRepository,
  } from '../../domain/inbound_orders.repository';
  import { Inbound_orders } from '../../domain/inbound_orders.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindInbound_ordersUseCase {
  constructor(
 @Inject(INBOUND_ORDERS_REPOSITORY)
      private readonly inbound_ordersRepository: IInbound_ordersRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Inbound_orders>> {
    return await this.inbound_ordersRepository.findAll(query);
  }
}
  
  