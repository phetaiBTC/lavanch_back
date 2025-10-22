import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { ICurrenciesRepository } from '../domain/currencies.repository';
import { Currencies } from '../domain/currencies.entity';
import { CurrenciesMapper } from './currencies.mapper';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
@Injectable()
export class CurrenciesRepositoryImpl
  extends BaseRepository<Currencies, CurrenciesOrm, any>
  implements ICurrenciesRepository
{
  constructor(
    @InjectRepository(CurrenciesOrm)
    protected readonly currenciesRepo: Repository<CurrenciesOrm>,
  ) {
    super(currenciesRepo, CurrenciesMapper, 'currencies', 'name');
  }

  async findByCode(code: string): Promise<Currencies | null> {
    const currenciesEntity = await this.currenciesRepo.findOne({
      where: { code },
    });
    return currenciesEntity
      ? CurrenciesMapper.toDomain(currenciesEntity)
      : null;
  }
}
