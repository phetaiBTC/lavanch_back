

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch_stocksOrm } from 'src/database/typeorm/branch_stocks.orm-entity';
import { Branch_stocksResponse } from '../interface/branch_stocks.interface';
import { Branch_stocks } from '../domain/branch_stocks.entity';
import { IBranch_stocksRepository } from '../domain/branch_stocks.repository';
import { Branch_stocksMapper } from './branch_stocks.mapper';
import { SelectQueryBuilder } from 'typeorm/browser';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';

@Injectable()
export class Branch_stocksRepositoryImpl
  extends BaseRepository<Branch_stocks, Branch_stocksOrm, Branch_stocksResponse>
  implements IBranch_stocksRepository
{
  constructor(
    @InjectRepository(Branch_stocksOrm)
    protected readonly repo: Repository<Branch_stocksOrm>,
  ) {
    super({
      repository: repo,
      mapper: Branch_stocksMapper,
      searchField: 'name',
    });
  }
  createQueryBuilder(): SelectQueryBuilder<Branch_stocksOrm> {
    return this.repo.createQueryBuilder('branch_stocks');
  }
}
