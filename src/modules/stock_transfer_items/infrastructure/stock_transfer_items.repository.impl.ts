

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock_transfer_itemsOrm } from 'src/database/typeorm/stock_transfer_items.orm-entity';
import { Stock_transfer_itemsResponse } from '../interface/stock_transfer_items.interface';
import { Stock_transfer_items } from '../domain/stock_transfer_items.entity';
import { IStock_transfer_itemsRepository } from '../domain/stock_transfer_items.repository';
import { Stock_transfer_itemsMapper } from './stock_transfer_items.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Stock_transfer_itemsRepositoryImpl
  extends BaseRepository<Stock_transfer_items, Stock_transfer_itemsOrm, Stock_transfer_itemsResponse>
  implements IStock_transfer_itemsRepository
{
  constructor(
    @InjectRepository(Stock_transfer_itemsOrm)
    protected readonly repo: Repository<Stock_transfer_itemsOrm>,
  ) {
    super({
      repository: repo,
      mapper: Stock_transfer_itemsMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Stock_transfer_itemsOrm> {
    return this.repo.createQueryBuilder('stock_transfer_items');
  }
}
