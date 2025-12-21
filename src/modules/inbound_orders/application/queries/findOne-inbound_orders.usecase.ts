
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    INBOUND_ORDERS_REPOSITORY,
    type IInbound_ordersRepository,
  } from '../../domain/inbound_orders.repository';
  import { Inbound_orders } from '../../domain/inbound_orders.entity';

@Injectable()
export class FindOneInbound_ordersUseCase {
  constructor(
 @Inject(INBOUND_ORDERS_REPOSITORY)
      private readonly inbound_ordersRepository: IInbound_ordersRepository,
  ) {}

  async execute(id: number): Promise<Inbound_orders> {
    const inbound_orders = await this.inbound_ordersRepository.findById(id);
    if (!inbound_orders) {
      throw new NotFoundException('Inbound_orders not found');
    }
    return inbound_orders;
  }
}
  
  