import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberPointsOrm } from 'src/database/typeorm/member_points.orm-entity';
import { IMemberPointRepository } from '../domain/member-point.repository';
import { MemberPoint } from '../domain/member-point.entity';
import { MemberPointMapper } from './member-point.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class MemberPointRepositoryImpl implements IMemberPointRepository {
  constructor(
    @InjectRepository(MemberPointsOrm)
    private readonly pointRepo: Repository<MemberPointsOrm>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<MemberPoint>> {
    const qb = this.pointRepo.createQueryBuilder('member_points').withDeleted();
    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'member_id' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: MemberPointMapper.toDomain,
    });
  }

  async findById(id: number): Promise<MemberPoint | null> {
    const entity = await this.pointRepo.findOne({ where: { id } });
    return entity ? MemberPointMapper.toDomain(entity) : null;
  }

  async findByMemberAndBranch(
    memberId: number,
    branchId: number,
  ): Promise<MemberPoint | null> {
    const entity = await this.pointRepo.findOne({
      where: { member_id: memberId, branch_id: branchId },
    });
    return entity ? MemberPointMapper.toDomain(entity) : null;
  }

  async create(memberPoint: MemberPoint): Promise<MemberPoint> {
    const entity = this.pointRepo.create(
      MemberPointMapper.toSchema(memberPoint),
    );
    const saved = await this.pointRepo.save(entity);
    return MemberPointMapper.toDomain(saved);
  }

  /**
   * Add points to member's balance at specific branch
   * Creates record if doesn't exist, otherwise increments
   */
  async addPoints(
    memberId: number,
    branchId: number,
    points: number,
  ): Promise<MemberPoint> {
    const existing = await this.pointRepo.findOne({
      where: { member_id: memberId, branch_id: branchId },
    });

    if (existing) {
      // Increment existing balance
      await this.pointRepo.increment(
        { member_id: memberId, branch_id: branchId },
        'points',
        points,
      );
      const updated = await this.pointRepo.findOne({
        where: { member_id: memberId, branch_id: branchId },
      });
      return MemberPointMapper.toDomain(updated!);
    } else {
      // Create new record
      const newPoint = new MemberPoint({
        member_id: memberId,
        branch_id: branchId,
        points: points,
      });
      return await this.create(newPoint);
    }
  }

  /**
   * Subtract points from member's balance
   * Throws error if insufficient balance
   */
  async subtractPoints(
    memberId: number,
    branchId: number,
    points: number,
  ): Promise<MemberPoint> {
    const existing = await this.pointRepo.findOne({
      where: { member_id: memberId, branch_id: branchId },
    });

    if (!existing) {
      throw new BadRequestException(
        `Member ${memberId} has no points record at branch ${branchId}`,
      );
    }

    const currentBalance = Number(existing.points);
    if (currentBalance < points) {
      throw new BadRequestException(
        `Insufficient points. Current: ${currentBalance}, Required: ${points}`,
      );
    }

    await this.pointRepo.decrement(
      { member_id: memberId, branch_id: branchId },
      'points',
      points,
    );

    const updated = await this.pointRepo.findOne({
      where: { member_id: memberId, branch_id: branchId },
    });
    return MemberPointMapper.toDomain(updated!);
  }

  /**
   * Get current point balance for member at branch
   */
  async getBalance(memberId: number, branchId: number): Promise<number> {
    const entity = await this.pointRepo.findOne({
      where: { member_id: memberId, branch_id: branchId },
    });
    return entity ? Number(entity.points) : 0;
  }
}
