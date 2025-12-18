import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistoryOrm } from 'src/database/typeorm/price_history.orm-entity';
import { IPriceHistoryRepository } from '../domain/price_history.repository';
import { PriceHistory } from '../domain/price_history.entity';
import { PriceHistoryMapper } from './price_history.mapper';
import { PriceHistoryResponse } from '../interface/price_history.interface';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
@Injectable()
export class PriceHistoryRepositoryImpl
  extends BaseRepository<PriceHistory, PriceHistoryOrm, PriceHistoryResponse>
  implements IPriceHistoryRepository
{
  constructor(
    @InjectRepository(PriceHistoryOrm)
    protected readonly price_historyRepo: Repository<PriceHistoryOrm>,
  ) {
    super({
      repository: price_historyRepo,
      mapper: PriceHistoryMapper,
      searchField: 'id',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<PriceHistoryOrm> {
    return this.price_historyRepo.createQueryBuilder('price_history');
  }
}
