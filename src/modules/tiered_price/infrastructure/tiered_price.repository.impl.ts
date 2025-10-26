import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITieredPriceRepository } from '../domain/tiered_price.repository';
import { TieredPrice } from '../domain/tiered_price.entity';
import { TieredPriceMapper } from './tiered_price.mapper';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { TieredPriceResponse } from '../interface/tiered_price.interface';
import { TieredPriceOrm } from 'src/database/typeorm/tiered-price.orm-entity';
@Injectable()
export class TieredPriceRepositoryImpl
  extends BaseRepository<TieredPrice, TieredPriceOrm, TieredPriceResponse>
  implements ITieredPriceRepository
{
  constructor(
    @InjectRepository(TieredPriceOrm)
    protected readonly tiered_priceRepo: Repository<TieredPriceOrm>,
  ) {
    super(tiered_priceRepo, TieredPriceMapper, 'tiered_price');
  }
}
