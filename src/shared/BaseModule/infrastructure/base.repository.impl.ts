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
    protected readonly repository: Repository<TOrm>,
    protected readonly mapper: BaseMapper<TDomain, TOrm, TResponse>,
    protected readonly tableName: string,
    protected readonly searchField: string = 'name',
  ) {}

  async findAll(
    query: PaginationDto,
    joins: { relation: string; as: string }[] = [],
  ): Promise<PaginatedResponse<TDomain>> {
    let qb = this.createBaseQueryBuilder().withDeleted();

    joins.forEach(({ relation, as }) => {
      qb = qb.leftJoinAndSelect(relation, as);
    });

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: this.searchField },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: this.mapper.toDomain.bind(this.mapper),
    });
  }

  async findById(id: number, relations?: string[]): Promise<TDomain | null> {
    const entity = await this.repository.findOne({
      where: { id } as any,
      relations,
      withDeleted: true,
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async save(domain: TDomain): Promise<TDomain> {
    const entity = this.repository.create(this.mapper.toSchema(domain));
    await this.repository.save(entity);
    return this.mapper.toDomain(entity);
  }

  // async update(domain: TDomain): Promise<TDomain> {
  //   const saved = await this.repository.save(
  //     this.mapper.toSchema(domain) as any,
  //   );
  //   return this.mapper.toDomain(saved);
  // }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.repository.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    await this.repository.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.repository.restore(id);
    return { message: 'restore successfully' };
  }

  protected createBaseQueryBuilder(): SelectQueryBuilder<TOrm> {
    return this.repository.createQueryBuilder(this.tableName);
  }

  async findByField<K extends keyof TOrm>(
    field: K,
    value: TOrm[K],
  ): Promise<TDomain | null> {
    const entity = await this.repository.findOne({
      where: { [field]: value } as any,
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
