import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { IBranchRepository } from '../domain/branch.repository';
import { Branch } from '../domain/branch.entity';
import { BranchMapper } from './branch.mapper';
import { PaginationDto, Status, ActiveStatus } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchSummaryResponse } from '../application/queries/get-branch-summary.usecase';

@Injectable()
export class BranchRepositoryImpl implements IBranchRepository {
  constructor(
    @InjectRepository(BranchesOrm)
    private readonly branchRepo: Repository<BranchesOrm>,
  ) {}

  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<Branch & { _orm?: BranchesOrm }>> {
    const qb = this.branchRepo
      .createQueryBuilder('branches')
      .withDeleted()
      .leftJoinAndSelect('branches.village', 'village')
      .leftJoinAndSelect('village.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('branches.shift', 'shift');

    if (query.search) {
      qb.andWhere(`branches.name LIKE :kw`, {
        kw: `%${query.search}%`,
      });
    }

    // Filter by deletedAt (soft delete status)
    if (query.is_active === Status.ACTIVE) {
      qb.andWhere(`branches.deletedAt IS NULL`);
    } else if (query.is_active === Status.INACTIVE) {
      qb.andWhere(`branches.deletedAt IS NOT NULL`);
    }

    // Filter by is_active column (active/inactive status)
    if (query.status === 'active') {
      qb.andWhere(`branches.is_active = :isActive`, { isActive: true });
    } else if (query.status === 'inactive') {
      qb.andWhere(`branches.is_active = :isActive`, { isActive: false });
    }
    // If status is 'all' or undefined, don't filter by is_active

    qb.orderBy(`branches.createdAt`, query.sort || 'DESC');

    const skip = ((query.page || 1) - 1) * (query.limit || 10);
    const [entities, total] = await qb
      .skip(skip)
      .take(query.limit || 10)
      .getManyAndCount();

    // Map to domain with ORM data attached
    const data = entities.map((entity) => {
      const domain = BranchMapper.toDomain(entity);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (domain as any)._orm = entity;
      return domain as Branch & { _orm?: BranchesOrm };
    });

    return {
      data,
      pagination: {
        total,
        count: entities.length,
        limit: query.limit || 10,
        totalPages: Math.ceil(total / (query.limit || 10)) || 1,
        currentPage: query.page || 1,
      },
    };
  }

  async findById(
    id: number,
  ): Promise<(Branch & { _orm?: BranchesOrm }) | null> {
    const entity = await this.branchRepo.findOne({
      where: { id },
      relations: [
        'village',
        'village.district',
        'village.district.province',
        'shift',
      ],
    });
    if (!entity) return null;

    const domain = BranchMapper.toDomain(entity);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (domain as any)._orm = entity;
    return domain as Branch & { _orm?: BranchesOrm };
  }

  async create(branch: Branch): Promise<Branch> {
    const entity = this.branchRepo.create(BranchMapper.toSchema(branch));
    const saved = await this.branchRepo.save(entity);
    return BranchMapper.toDomain(saved);
  }

  async update(branch: Branch): Promise<Branch> {
    const saved = await this.branchRepo.save(BranchMapper.toSchema(branch));
    return BranchMapper.toDomain(saved);
  }

  /**
   * Update branch wallet balance
   * This method is called by wallet transaction service
   */
  async updateWalletBalance(
    branchId: number,
    newBalance: number,
  ): Promise<Branch> {
    const branch = await this.findById(branchId);
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${branchId} not found`);
    }

    const updated = branch.updateWalletBalance(newBalance);
    return this.update(updated);
  }

  /**
   * Get current wallet balance for a branch
   */
  async getWalletBalance(branchId: number): Promise<number> {
    const branch = await this.branchRepo.findOne({
      where: { id: branchId },
      select: ['wallet_balance'],
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${branchId} not found`);
    }

    return Number(branch.wallet_balance);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.branchRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    // Set is_active to false before soft deleting
    await this.branchRepo.update(id, { is_active: false });
    await this.branchRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.branchRepo.restore(id);
    // Set is_active to true after restoring
    await this.branchRepo.update(id, { is_active: true });
    return { message: 'restore successfully' };
  }

  async getSummary(): Promise<BranchSummaryResponse> {
    // Get all branches with their wallet balances
    const branches = await this.branchRepo.find({
      select: ['id', 'name', 'wallet_balance', 'is_active'],
      where: { deletedAt: null as any }, // Only active (non-deleted) branches
    });

    // Calculate wallet balance per branch
    const total_wallet_balance_per_branch = branches.map((branch) => ({
      branch_id: branch.id,
      branch_name: branch.name,
      wallet_balance: Number(branch.wallet_balance),
    }));

    // Calculate total wallet balance
    const total_wallet_balance_all_branches = branches.reduce(
      (sum, branch) => sum + Number(branch.wallet_balance),
      0,
    );

    // Count active and inactive branches
    const active_count = branches.filter((b) => b.is_active === true).length;
    const inactive_count = branches.filter((b) => b.is_active === false).length;

    return {
      total_wallet_balance_per_branch,
      total_wallet_balance_all_branches,
      active_count,
      inactive_count,
    };
  }

  async deleteMultiple(ids: number[]): Promise<void> {
    await this.branchRepo.softDelete(ids);
  }
}
