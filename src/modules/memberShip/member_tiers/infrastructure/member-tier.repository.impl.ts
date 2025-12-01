import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberTiersOrm } from 'src/database/typeorm/member_tiers.orm-entity';
import { IMemberTierRepository } from '../domain/member-tier.repository';
import { MemberTier } from '../domain/member-tier.entity';
import { MemberTierMapper } from './member-tier.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class MemberTierRepositoryImpl implements IMemberTierRepository {
  constructor(
    @InjectRepository(MemberTiersOrm)
    private readonly tierRepo: Repository<MemberTiersOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<MemberTier>> {
    const qb = this.tierRepo.createQueryBuilder('member_tiers').withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: MemberTierMapper.toDomain,
    });
  }

  async findById(id: number): Promise<MemberTier | null> {
    const entity = await this.tierRepo.findOne({ where: { id } });
    return entity ? MemberTierMapper.toDomain(entity) : null;
  }

  async create(memberTier: MemberTier): Promise<MemberTier> {
    const entity = this.tierRepo.create(MemberTierMapper.toSchema(memberTier));
    const saved = await this.tierRepo.save(entity);
    return MemberTierMapper.toDomain(saved);
  }

  async update(memberTier: MemberTier): Promise<MemberTier> {
    const saved = await this.tierRepo.save(MemberTierMapper.toSchema(memberTier));
    return MemberTierMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.tierRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    await this.tierRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.tierRepo.restore(id);
    return { message: 'restore successfully' };
  }
}
