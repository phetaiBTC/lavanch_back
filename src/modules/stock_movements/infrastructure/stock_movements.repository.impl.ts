

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock_movementsOrm } from 'src/database/typeorm/stock_movements.orm-entity';
import { Stock_movementsResponse } from '../interface/stock_movements.interface';
import { Stock_movements } from '../domain/stock_movements.entity';
import { IStock_movementsRepository } from '../domain/stock_movements.repository';
import { Stock_movementsMapper } from './stock_movements.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Stock_movementsRepositoryImpl
  extends BaseRepository<Stock_movements, Stock_movementsOrm, Stock_movementsResponse>
  implements IStock_movementsRepository
{
  constructor(
    @InjectRepository(Stock_movementsOrm)
    protected readonly repo: Repository<Stock_movementsOrm>,
  ) {
    super({
      repository: repo,
      mapper: Stock_movementsMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Stock_movementsOrm> {
    return this.repo.createQueryBuilder('stock_movements');
  }
}
