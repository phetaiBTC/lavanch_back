
import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDERS_REPOSITORY,
    type IInbound_ordersRepository,
  } from '../../domain/inbound_orders.repository';
import { FindOneInbound_ordersUseCase } from '../queries/findOne-inbound_orders.usecase';


@Injectable()
export class HardDeleteInbound_ordersUseCase {
  constructor(
      @Inject(INBOUND_ORDERS_REPOSITORY)
      private readonly inbound_ordersRepository: IInbound_ordersRepository,
      private readonly inbound_ordersGetOne: FindOneInbound_ordersUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.inbound_ordersGetOne.execute(id)));
    return await this.inbound_ordersRepository.hardDelete(id);
  }
}
  
  