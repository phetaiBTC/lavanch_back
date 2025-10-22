// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { IPointRepository } from '../domain/point.repository';
// import { Point } from '../domain/point.entity';
// import { PointMapper } from './point.mapper';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { fetchWithPagination } from 'src/shared/utils/pagination.util';
// import { PointOrm } from 'src/database/typeorm/point.orm-entity';
// import { PointNameCode } from 'src/shared/enum/point-name-code';
// @Injectable()
// export class PointRepositoryImpl implements IPointRepository {
//   constructor(
//     @InjectRepository(PointOrm)
//     private readonly pointRepo: Repository<PointOrm>,
//   ) {}
//   async findAll(query: PaginationDto): Promise<PaginatedResponse<Point>> {
//     const qb = this.pointRepo.createQueryBuilder('point').withDeleted();
//     return await fetchWithPagination({
//       qb,
//       page: query.page || 1,
//       type: query.type,
//       search: { kw: query.search, field: 'name' },
//       is_active: query.is_active,
//       sort: query.sort,
//       limit: query.limit || 10,
//       toDomain: PointMapper.toDomain,
//     });
//   }
//   async findById(id: number): Promise<Point | null> {
//     const pointEntity = await this.pointRepo.findOne({ where: { id } });
//     return pointEntity ? PointMapper.toDomain(pointEntity) : null;
//   }
//   async create(point: Point): Promise<Point> {
//     const entity = this.pointRepo.create(PointMapper.toSchema(point));
//     const saved = await this.pointRepo.save(entity);
//     return PointMapper.toDomain(saved);
//   }
//   async update(point: Point): Promise<Point> {
//     const saved = await this.pointRepo.save(PointMapper.toSchema(point));
//     return PointMapper.toDomain(saved);
//   }
//   async hardDelete(id: number): Promise<{ message: string }> {
//     await this.pointRepo.delete(id);
//     return { message: 'hard delete sussessfully' };
//   }
//   async softDelete(id: number): Promise<{ message: string }> {
//     await this.pointRepo.softDelete(id);
//     return { message: 'soft delete sussessfully' };
//   }
//   async restore(id: number): Promise<{ message: string }> {
//     await this.pointRepo.restore(id);
//     return { message: 'restore sussessfully' };
//   }
//   async findByName(name: string): Promise<Point | null> {
//     const point = await this.pointRepo.findOne({ where: { name } });
//     return point ? PointMapper.toDomain(point) : null;
//   }
//   async findByNameCode(name_code: PointNameCode): Promise<Point | null> {
//     const point = await this.pointRepo.findOne({ where: { name_code } });
//     return point ? PointMapper.toDomain(point) : null;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { Point } from '../domain/point.entity';
import { PointMapper } from './point.mapper';
import { IPointRepository } from '../domain/point.repository';
import { PointResponse } from '../interface/point.interface';
import { PointNameCode } from 'src/shared/enum/point-name-code';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { Repository } from 'typeorm';

@Injectable()
export class PointRepositoryImpl
  extends BaseRepository<Point, PointOrm, PointResponse>
  implements IPointRepository
{
  constructor(
    @InjectRepository(PointOrm)
    pointRepo: Repository<PointOrm>,
  ) {
    super(pointRepo, PointMapper, 'point', 'name');
  }

  async findByName(name: string): Promise<Point | null> {
    return this.findByField('name', name);
  }

  async findByNameCode(name_code: PointNameCode): Promise<Point | null> {
    return this.findByField('name_code', name_code);
  }
}
