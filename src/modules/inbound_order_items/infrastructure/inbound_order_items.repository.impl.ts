

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inbound_order_itemsOrm } from 'src/database/typeorm/inbound_order_items.orm-entity';
import { Inbound_order_itemsResponse } from '../interface/inbound_order_items.interface';
import { Inbound_order_items } from '../domain/inbound_order_items.entity';
import { IInbound_order_itemsRepository } from '../domain/inbound_order_items.repository';
import { Inbound_order_itemsMapper } from './inbound_order_items.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Inbound_order_itemsRepositoryImpl
  extends BaseRepository<Inbound_order_items, Inbound_order_itemsOrm, Inbound_order_itemsResponse>
  implements IInbound_order_itemsRepository
{
  constructor(
    @InjectRepository(Inbound_order_itemsOrm)
    protected readonly repo: Repository<Inbound_order_itemsOrm>,
  ) {
    super({
      repository: repo,
      mapper: Inbound_order_itemsMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Inbound_order_itemsOrm> {
    return this.repo.createQueryBuilder('inbound_order_items');
  }
}
