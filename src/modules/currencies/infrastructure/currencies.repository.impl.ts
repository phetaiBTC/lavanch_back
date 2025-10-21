import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { ICurrenciesRepository } from '../domain/currencies.repository';
import { Currencies } from '../domain/currencies.entity';
import { CurrenciesMapper } from './currencies.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
@Injectable()
export class CurrenciesRepositoryImpl implements ICurrenciesRepository {
  constructor(
    @InjectRepository(CurrenciesOrm)
    private readonly currenciesRepo: Repository<CurrenciesOrm>,
  ) {}
  async findAll(query: PaginationDto): Promise<PaginatedResponse<Currencies>> {
    const qb = this.currenciesRepo
      .createQueryBuilder('currencies')
      .withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: CurrenciesMapper.toDomain,
    });
  }
  async findById(id: number): Promise<Currencies | null> {
    const currenciesEntity = await this.currenciesRepo.findOne({
      where: { id },
    });
    return currenciesEntity
      ? CurrenciesMapper.toDomain(currenciesEntity)
      : null;
  }
  async findByCode(code: string): Promise<Currencies | null> {
    const currenciesEntity = await this.currenciesRepo.findOne({
      where: { code },
    });
    return currenciesEntity
      ? CurrenciesMapper.toDomain(currenciesEntity)
      : null;
  }
  async create(currencies: Currencies): Promise<Currencies> {
    const entity = this.currenciesRepo.create(
      CurrenciesMapper.toSchema(currencies),
    );
    const saved = await this.currenciesRepo.save(entity);
    return CurrenciesMapper.toDomain(saved);
  }
  async update(currencies: Currencies): Promise<Currencies> {
    const saved = await this.currenciesRepo.save(
      CurrenciesMapper.toSchema(currencies),
    );
    return CurrenciesMapper.toDomain(saved);
  }
  async hardDelete(id: number): Promise<{ message: string }> {
    await this.currenciesRepo.delete(id);
    return { message: 'hard delete sussessfully' };
  }
  async softDelete(id: number): Promise<{ message: string }> {
    await this.currenciesRepo.softDelete(id);
    return { message: 'soft delete sussessfully' };
  }
  async restore(id: number): Promise<{ message: string }> {
    await this.currenciesRepo.restore(id);
    return { message: 'restore sussessfully' };
  }
}
