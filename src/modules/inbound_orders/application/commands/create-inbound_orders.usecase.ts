
  import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDERS_REPOSITORY,
    type IInbound_ordersRepository,
  } from '../../domain/inbound_orders.repository';
  import { CreateInbound_ordersDto } from '../../dto/create-inbound_orders.dto';
  import { Inbound_orders } from '../../domain/inbound_orders.entity';

  @Injectable()
  export class CreateInbound_ordersUseCase {
    constructor(
      @Inject(INBOUND_ORDERS_REPOSITORY)
      private readonly inbound_ordersRepository: IInbound_ordersRepository,
    ) {}

    async execute(body: CreateInbound_ordersDto): Promise<Inbound_orders> {
      const inbound_orders = new Inbound_orders({
        name: body.name,
      });
      return await this.inbound_ordersRepository.save(inbound_orders);
    }
  }
