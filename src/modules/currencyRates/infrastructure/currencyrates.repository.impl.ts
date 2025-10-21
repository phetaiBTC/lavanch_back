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
@Injectable()
export class CurrencyRatesRepositoryImpl implements ICurrencyRatesRepository {
  constructor(
    @InjectRepository(CurrencyRatesOrm)
    private readonly currencyratesRepo: Repository<CurrencyRatesOrm>,
  ) {}
  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<CurrencyRates>> {
    const qb = this.currencyratesRepo
      .createQueryBuilder('currencyrates')
      .leftJoinAndSelect('currencyrates.from_currency_id', 'from_currency_id')
      .leftJoinAndSelect('currencyrates.to_currency_id', 'to_currency_id')
      .withDeleted();
    // console.log(await qb.getMany());
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: CurrencyRatesMapper.toDomain,
    });
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
  async create(currencyrates: CurrencyRates): Promise<CurrencyRates> {
    const entity = this.currencyratesRepo.create(
      CurrencyRatesMapper.toSchema(currencyrates),
    );
    const saved = await this.currencyratesRepo.save(entity);
    return CurrencyRatesMapper.toDomain(saved);
  }
  async update(currencyrates: CurrencyRates): Promise<CurrencyRates> {
    const saved = await this.currencyratesRepo.save(
      CurrencyRatesMapper.toSchema(currencyrates),
    );
    return CurrencyRatesMapper.toDomain(saved);
  }
  async hardDelete(id: number): Promise<{ message: string }> {
    await this.currencyratesRepo.delete(id);
    return { message: 'hard delete sussessfully' };
  }
  async softDelete(id: number): Promise<{ message: string }> {
    await this.currencyratesRepo.softDelete(id);
    return { message: 'soft delete sussessfully' };
  }
  async restore(id: number): Promise<{ message: string }> {
    await this.currencyratesRepo.restore(id);
    return { message: 'restore sussessfully' };
  }
}
