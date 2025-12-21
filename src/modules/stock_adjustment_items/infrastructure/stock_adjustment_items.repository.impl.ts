

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock_adjustment_itemsOrm } from 'src/database/typeorm/stock_adjustment_items.orm-entity';
import { Stock_adjustment_itemsResponse } from '../interface/stock_adjustment_items.interface';
import { Stock_adjustment_items } from '../domain/stock_adjustment_items.entity';
import { IStock_adjustment_itemsRepository } from '../domain/stock_adjustment_items.repository';
import { Stock_adjustment_itemsMapper } from './stock_adjustment_items.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Stock_adjustment_itemsRepositoryImpl
  extends BaseRepository<Stock_adjustment_items, Stock_adjustment_itemsOrm, Stock_adjustment_itemsResponse>
  implements IStock_adjustment_itemsRepository
{
  constructor(
    @InjectRepository(Stock_adjustment_itemsOrm)
    protected readonly repo: Repository<Stock_adjustment_itemsOrm>,
  ) {
    super({
      repository: repo,
      mapper: Stock_adjustment_itemsMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Stock_adjustment_itemsOrm> {
    return this.repo.createQueryBuilder('stock_adjustment_items');
  }
}
