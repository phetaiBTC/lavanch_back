
  import { Inject, Injectable } from '@nestjs/common';
  import {
    INBOUND_ORDERS_REPOSITORY,
    type IInbound_ordersRepository,
  } from '../../domain/inbound_orders.repository';
  import { CreateInbound_ordersDto } from '../../dto/create-inbound_orders.dto';
  import { Inbound_orders } from '../../domain/inbound_orders.entity';
import { FindOneInbound_ordersUseCase } from '../queries/findOne-inbound_orders.usecase';

  import { UpdateInbound_ordersDto } from '../../dto/update-inbound_orders.dto';

  @Injectable()
  export class UpdateInbound_ordersUseCase {
    constructor(
      @Inject(INBOUND_ORDERS_REPOSITORY)
      private readonly inbound_ordersRepository: IInbound_ordersRepository,
      private readonly inbound_ordersGetOne: FindOneInbound_ordersUseCase,
    ) {}

    async execute(id: number, body: UpdateInbound_ordersDto): Promise<Inbound_orders> {
      const inbound_orders = await this.inbound_ordersGetOne.execute(id);
      const update = inbound_orders.update({
        name: body.name,
      });
      return await this.inbound_ordersRepository.save(update);
    }
  }