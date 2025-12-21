

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
import { Stock_transfersResponse } from '../interface/stock_transfers.interface';
import { Stock_transfers } from '../domain/stock_transfers.entity';
import { IStock_transfersRepository } from '../domain/stock_transfers.repository';
import { Stock_transfersMapper } from './stock_transfers.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Stock_transfersRepositoryImpl
  extends BaseRepository<Stock_transfers, Stock_transfersOrm, Stock_transfersResponse>
  implements IStock_transfersRepository
{
  constructor(
    @InjectRepository(Stock_transfersOrm)
    protected readonly repo: Repository<Stock_transfersOrm>,
  ) {
    super({
      repository: repo,
      mapper: Stock_transfersMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Stock_transfersOrm> {
    return this.repo.createQueryBuilder('stock_transfers');
  }
}
