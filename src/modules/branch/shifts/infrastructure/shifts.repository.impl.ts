import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShiftsOrm } from 'src/database/typeorm/shifts.orm-entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { IShiftsRepository } from '../domain/shifts.repository';
import { Shifts } from '../domain/shifts.entity';
import { ShiftsMapper } from './shifts.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class ShiftsRepositoryImpl implements IShiftsRepository {
  constructor(
    @InjectRepository(ShiftsOrm)
    private readonly shiftsRepo: Repository<ShiftsOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Shifts>> {
    const qb = this.shiftsRepo.createQueryBuilder('shifts').withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'start_time' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: ShiftsMapper.toDomain,
    });
  }

  async findById(id: number): Promise<Shifts | null> {
    const shiftsEntity = await this.shiftsRepo.findOne({ where: { id } });
    return shiftsEntity ? ShiftsMapper.toDomain(shiftsEntity) : null;
  }

  async create(shifts: Shifts): Promise<Shifts> {
    const entity = this.shiftsRepo.create(ShiftsMapper.toSchema(shifts));
    const saved = await this.shiftsRepo.save(entity);
    return ShiftsMapper.toDomain(saved);
  }

  async update(shifts: Shifts): Promise<Shifts> {
    const saved = await this.shiftsRepo.save(ShiftsMapper.toSchema(shifts));
    return ShiftsMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    const branchRepo = this.shiftsRepo.manager.getRepository(BranchesOrm);
    const dependentCount = await branchRepo.count({ where: { shifts_id: id } });
    if (dependentCount > 0) {
      await branchRepo
        .createQueryBuilder()
        .update(BranchesOrm)

        .set({ shifts_id: () => 'NULL' })
        .where('shifts_id = :id', { id })
        .execute();
    }

    await this.shiftsRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    await this.shiftsRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.shiftsRepo.restore(id);
    return { message: 'restore successfully' };
  }
}
