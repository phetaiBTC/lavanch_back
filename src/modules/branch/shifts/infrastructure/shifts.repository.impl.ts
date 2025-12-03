import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShiftsOrm } from 'src/database/typeorm/shifts.orm-entity';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { IShiftsRepository } from '../domain/shifts.repository';
import { Shifts } from '../domain/shifts.entity';
import { ShiftsMapper } from './shifts.mapper';
import { PaginationDto, Status } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class ShiftsRepositoryImpl implements IShiftsRepository {
  constructor(
    @InjectRepository(ShiftsOrm)
    private readonly shiftsRepo: Repository<ShiftsOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Shifts>> {
    const qb = this.shiftsRepo.createQueryBuilder('shifts');
    
    // Handle search
    if (query.search) {
      qb.andWhere('shifts.start_time LIKE :kw', {
        kw: `%${query.search}%`,
      });
    }

    // Handle is_active filter using deletedAt for soft deletion
    if (query.is_active === Status.ACTIVE) {
      qb.andWhere('shifts.deletedAt IS NULL');
    } else if (query.is_active === Status.INACTIVE) {
      qb.withDeleted().andWhere('shifts.deletedAt IS NOT NULL');
    } else {
      // For undefined or any other value, show both active and inactive
      qb.withDeleted();
    }

    // Handle sorting
    qb.orderBy('shifts.createdAt', query.sort || 'DESC');

    // Handle pagination
    if (query.type === 'page') {
      const skip = ((query.page || 1) - 1) * (query.limit || 10);
      const [entities, total] = await qb
        .skip(skip)
        .take(query.limit || 10)
        .getManyAndCount();

      return {
        data: entities.map(ShiftsMapper.toDomain),
        pagination: {
          total,
          count: entities.length,
          limit: query.limit || 10,
          totalPages: Math.ceil(total / (query.limit || 10)) || 1,
          currentPage: query.page || 1,
        },
      };
    } else {
      // Get all without pagination
      const [entities, total] = await qb.getManyAndCount();
      return {
        data: entities.map(ShiftsMapper.toDomain),
        pagination: {
          total,
          count: entities.length,
          limit: 0,
          totalPages: 1,
          currentPage: 1,
        },
      };
    }
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
