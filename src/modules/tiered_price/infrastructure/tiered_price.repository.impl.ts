import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITieredPriceRepository } from '../domain/tiered_price.repository';
import { TieredPrice } from '../domain/tiered_price.entity';
import { TieredPriceMapper } from './tiered_price.mapper';
import { TieredPriceResponse } from '../interface/tiered_price.interface';
import { TieredPriceOrm } from 'src/database/typeorm/tiered-price.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
@Injectable()
export class TieredPriceRepositoryImpl
  extends BaseRepository<TieredPrice, TieredPriceOrm, TieredPriceResponse>
  implements ITieredPriceRepository
{
  constructor(
    @InjectRepository(TieredPriceOrm)
    protected readonly tiered_priceRepo: Repository<TieredPriceOrm>,
  ) {
    super({
      mapper: TieredPriceMapper,
      repository: tiered_priceRepo,
      searchField: 'id',
    });
  }
  override createQueryBuilder(): SelectQueryBuilder<TieredPriceOrm> {
    return this.tiered_priceRepo.createQueryBuilder('tiered_price');
  }
}
