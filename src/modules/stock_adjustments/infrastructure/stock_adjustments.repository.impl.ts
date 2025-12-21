

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock_adjustmentsOrm } from 'src/database/typeorm/stock_adjustments.orm-entity';
import { Stock_adjustmentsResponse } from '../interface/stock_adjustments.interface';
import { Stock_adjustments } from '../domain/stock_adjustments.entity';
import { IStock_adjustmentsRepository } from '../domain/stock_adjustments.repository';
import { Stock_adjustmentsMapper } from './stock_adjustments.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Stock_adjustmentsRepositoryImpl
  extends BaseRepository<Stock_adjustments, Stock_adjustmentsOrm, Stock_adjustmentsResponse>
  implements IStock_adjustmentsRepository
{
  constructor(
    @InjectRepository(Stock_adjustmentsOrm)
    protected readonly repo: Repository<Stock_adjustmentsOrm>,
  ) {
    super({
      repository: repo,
      mapper: Stock_adjustmentsMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Stock_adjustmentsOrm> {
    return this.repo.createQueryBuilder('stock_adjustments');
  }
}
