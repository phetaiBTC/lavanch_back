// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { IUnitRepository } from '../domain/unit.repository';
// import { Unit } from '../domain/unit.entity';
// import { UnitMapper } from './unit.mapper';
// import { PaginationDto } from 'src/shared/dto/pagination.dto';
// import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
// import { fetchWithPagination } from 'src/shared/utils/pagination.util';
// import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
// @Injectable()
// export class UnitRepositoryImpl implements IUnitRepository {
//   constructor(
//     @InjectRepository(UnitOrm) private readonly unitRepo: Repository<UnitOrm>,
//   ) {}
//   async findAll(query: PaginationDto): Promise<PaginatedResponse<Unit>> {
//     const qb = this.unitRepo.createQueryBuilder('unit').withDeleted();
//     return await fetchWithPagination({
//       qb,
//       page: query.page || 1,
//       type: query.type,
//       search: { kw: query.search, field: 'name' },
//       is_active: query.is_active,
//       sort: query.sort,
//       limit: query.limit || 10,
//       toDomain: UnitMapper.toDomain,
//     });
//   }
//   async findById(id: number): Promise<Unit | null> {
//     const unitEntity = await this.unitRepo.findOne({ withDeleted: true, where: { id } });
//     return unitEntity ? UnitMapper.toDomain(unitEntity) : null;
//   }
//   async create(unit: Unit): Promise<Unit> {
//     const entity = this.unitRepo.create(UnitMapper.toSchema(unit));
//     const saved = await this.unitRepo.save(entity);
//     return UnitMapper.toDomain(saved);
//   }
//   async update(unit: Unit): Promise<Unit> {
//     const saved = await this.unitRepo.save(UnitMapper.toSchema(unit));
//     return UnitMapper.toDomain(saved);
//   }
//   async hardDelete(id: number): Promise<{ message: string }> {
//     await this.unitRepo.delete(id);
//     return { message: 'hard delete sussessfully' };
//   }
//   async softDelete(id: number): Promise<{ message: string }> {
//     await this.unitRepo.softDelete(id);
//     return { message: 'soft delete sussessfully' };
//   }
//   async restore(id: number): Promise<{ message: string }> {
//     await this.unitRepo.restore(id);
//     return { message: 'restore sussessfully' };
//   }
//   async findByName(name: string): Promise<Unit | null> {
//     const unitEntity = await this.unitRepo.findOne({ where: { name } });
//     return unitEntity ? UnitMapper.toDomain(unitEntity) : null;
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUnitRepository } from '../domain/unit.repository';
import { Unit } from '../domain/unit.entity';
import { UnitMapper } from './unit.mapper';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { BaseRepository } from 'src/shared/BaseModule/infrastructure/base.repository.impl';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class UnitRepositoryImpl
  extends BaseRepository<Unit, UnitOrm, any>
  implements IUnitRepository
{
  constructor(
    @InjectRepository(UnitOrm)
    private readonly unitRepo: Repository<UnitOrm>,
  ) {
    super(unitRepo, UnitMapper, 'unit', 'name');
  }

  async findByName(name: string): Promise<Unit | null> {
    return this.findByField('name', name);
  }
}

