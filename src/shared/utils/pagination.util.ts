import { SelectQueryBuilder } from 'typeorm';
import { GetType, sortType, Status } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interface/pagination.interface';

export async function fetchWithPagination<T extends object, U>(query: {
  qb: SelectQueryBuilder<T>;
  sort?: sortType;
  search?: { kw?: string; field: string };
  page: number;
  limit: number;
  is_active?: Status;
  type?: GetType;
  toDomain: (entity: T) => U;
}): Promise<PaginatedResponse<U>> {
  if (query.search && query.search.kw) {
    console.log(query.search.kw, query.search.field);
    query.qb.andWhere(`${query.search.field} LIKE :kw`, {
      kw: `%${query.search.kw}%`,
    });
  }

  if (query.is_active === Status.ACTIVE) {
    query.qb.andWhere(`${query.qb.alias}.deletedAt IS NULL`);
  } else {
    query.qb.andWhere(`${query.qb.alias}.deletedAt IS NOT NULL`);
  }

  query.qb.orderBy(`${query.qb.alias}.createdAt`, query.sort || sortType.DESC);

  if (query.type === GetType.ALL) {
    const [entities, total] = await query.qb.getManyAndCount();
    return {
      data: entities.map(query.toDomain),
      pagination: {
        total,
        count: entities.length,
        limit: 0,
        totalPages: 1,
        currentPage: 1,
      },
    };
  }

  const skip = (query.page - 1) * query.limit;
  const [entities, total] = await query.qb
    .skip(skip)
    .take(query.limit)
    .getManyAndCount();

  return {
    data: entities.map(query.toDomain), 
    pagination: {
      total,
      count: entities.length,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit) || 1,
      currentPage: query.page,
    },
  };
}
