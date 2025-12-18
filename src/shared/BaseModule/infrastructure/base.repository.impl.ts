import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { BaseMapper } from './base.mapper';
import { IBaseRepository } from '../domain/base.repository';

export abstract class BaseRepository<
  TDomain,
  TOrm extends ObjectLiteral,
  TResponse,
> implements IBaseRepository<TDomain>
{
  constructor(
    protected readonly parms: {
      repository: Repository<TOrm>;
      mapper: BaseMapper<TDomain, TOrm, TResponse>;
      searchField: string;
    },
  ) {}
  abstract createQueryBuilder(): SelectQueryBuilder<TOrm>;

  async findAll(query: PaginationDto): Promise<PaginatedResponse<TDomain>> {
    const qb = this.createQueryBuilder();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: this.parms.searchField },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: this.parms.mapper.toDomain.bind(this.parms.mapper),
    });
  }

  async findById(id: number): Promise<TDomain | null> {
    const entity = await this.createQueryBuilder()
      .withDeleted()
      .where({ id })
      .getOne();
    return entity ? this.parms.mapper.toDomain(entity) : null;
  }

  async save(domain: TDomain): Promise<TDomain> {
    const entity = this.parms.repository.create(
      this.parms.mapper.toSchema(domain),
    );
    await this.parms.repository.save(entity);
    return this.parms.mapper.toDomain(entity);
  }

  async hardDelete(id: number[]): Promise<{ message: string }> {
    await this.parms.repository.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number[]): Promise<{ message: string }> {
    await this.parms.repository.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number[]): Promise<{ message: string }> {
    await this.parms.repository.restore(id);
    return { message: 'restore successfully' };
  }

  async findByField<K extends keyof TOrm>(
    field: K,
    value: TOrm[K],
  ): Promise<TDomain | null> {
    const entity = await this.parms.repository.findOne({
      where: { [field]: value } as any,
    });
    return entity ? this.parms.mapper.toDomain(entity) : null;
  }
}
