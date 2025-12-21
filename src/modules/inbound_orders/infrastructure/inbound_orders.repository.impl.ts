

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inbound_ordersOrm } from 'src/database/typeorm/inbound_orders.orm-entity';
import { Inbound_ordersResponse } from '../interface/inbound_orders.interface';
import { Inbound_orders } from '../domain/inbound_orders.entity';
import { IInbound_ordersRepository } from '../domain/inbound_orders.repository';
import { Inbound_ordersMapper } from './inbound_orders.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Inbound_ordersRepositoryImpl
  extends BaseRepository<Inbound_orders, Inbound_ordersOrm, Inbound_ordersResponse>
  implements IInbound_ordersRepository
{
  constructor(
    @InjectRepository(Inbound_ordersOrm)
    protected readonly repo: Repository<Inbound_ordersOrm>,
  ) {
    super({
      repository: repo,
      mapper: Inbound_ordersMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Inbound_ordersOrm> {
    return this.repo.createQueryBuilder('inbound_orders');
  }
}
