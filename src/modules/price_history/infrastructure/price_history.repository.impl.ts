import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistoryOrm } from 'src/database/typeorm/price_history.orm-entity';
import { IPriceHistoryRepository } from '../domain/price_history.repository';
import { PriceHistory } from '../domain/price_history.entity';
import { PriceHistoryMapper } from './price_history.mapper';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { PriceHistoryResponse } from '../interface/price_history.interface';
@Injectable()
export class PriceHistoryRepositoryImpl
  extends BaseRepository<PriceHistory, PriceHistoryOrm, PriceHistoryResponse>
  implements IPriceHistoryRepository
{
  constructor(
    @InjectRepository(PriceHistoryOrm)
    protected readonly price_historyRepo: Repository<PriceHistoryOrm>,
  ) {
    super(price_historyRepo, PriceHistoryMapper, 'price_history');
  }
}
