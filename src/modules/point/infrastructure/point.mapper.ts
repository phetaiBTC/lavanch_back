import { PointResponse } from '../interface/point.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { Point } from '../domain/point.entity';

export const PointMapper = {
  toDomain(schema: PointOrm): Point {
    return new Point({
      id: schema.id,
      name: schema.name,
      points_multiplier: schema.points_multiplier,
      name_code: schema.name_code,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: Point): PointOrm {
    const schema = new PointOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.name != null) schema.name = domain.value.name;
    if (domain.value.points_multiplier != null)
      schema.points_multiplier = domain.value.points_multiplier;
    if (domain.value.name_code != null)
      schema.name_code = domain.value.name_code;
    return schema;
  },
  toResponse(domain: Point): PointResponse {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      points_multiplier: domain.value.points_multiplier,
      name_code: domain.value.name_code,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
  toResponseList(domain: {
    data: Point[];
    pagination: IPagination;
  }): PaginatedResponse<PointResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};
