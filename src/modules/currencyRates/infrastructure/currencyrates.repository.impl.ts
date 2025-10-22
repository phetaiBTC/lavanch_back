import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyRatesOrm } from 'src/database/typeorm/currencyRates.orm-entity';
import { ICurrencyRatesRepository } from '../domain/currencyrates.repository';
import { CurrencyRates } from '../domain/currencyrates.entity';
import { CurrencyRatesMapper } from './currencyrates.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
@Injectable()
export class CurrencyRatesRepositoryImpl
  extends BaseRepository<CurrencyRates, CurrencyRatesOrm, any>
  implements ICurrencyRatesRepository
{
  constructor(
    @InjectRepository(CurrencyRatesOrm)
    protected readonly currencyratesRepo: Repository<CurrencyRatesOrm>,
  ) {
    super(currencyratesRepo, CurrencyRatesMapper, 'currencyrates', 'rate');
  }
  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<CurrencyRates>> {
    return super.findAll(query, [
      { relation: 'currencyrates.from_currency_id', as: 'from_currency_id' },
      { relation: 'currencyrates.to_currency_id', as: 'to_currency_id' },
    ]);
  }
  async findById(id: number): Promise<CurrencyRates | null> {
    const currencyratesEntity = await this.currencyratesRepo.findOne({
      where: { id },
      relations: ['from_currency_id', 'to_currency_id'],
      withDeleted: true,
    });
    return currencyratesEntity
      ? CurrencyRatesMapper.toDomain(currencyratesEntity)
      : null;
  }
}
