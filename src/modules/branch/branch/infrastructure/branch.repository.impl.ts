import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { IBranchRepository } from '../domain/branch.repository';
import { Branch } from '../domain/branch.entity';
import { BranchMapper } from './branch.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';
import { BranchSummaryResponse } from '../interface/branch.interface';

@Injectable()
export class BranchRepositoryImpl implements IBranchRepository {
  constructor(
    @InjectRepository(BranchesOrm)
    private readonly branchRepo: Repository<BranchesOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Branch>> {
    const qb = this.branchRepo
      .createQueryBuilder('branches')
      .withDeleted()
      .leftJoinAndSelect('branches.village', 'village')
      .leftJoinAndSelect('village.district', 'district')
      .leftJoinAndSelect('district.province', 'province')
      .leftJoinAndSelect('branches.shift', 'shift');

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'branches.name' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: BranchMapper.toDomain,
    });
  }

  async findById(id: number): Promise<Branch | null> {
    const entity = await this.branchRepo.findOne({
      where: { id },
      relations: ['village', 'village.district', 'village.district.province', 'shift'],
    });
    return entity ? BranchMapper.toDomain(entity) : null;
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
  async updateWalletBalance(branchId: number, newBalance: number): Promise<Branch> {
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
    await this.branchRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.branchRepo.restore(id);
    return { message: 'restore successfully' };
  }

  async getSummary(): Promise<BranchSummaryResponse> {
    const branches = await this.branchRepo.find({
      select: ['id', 'name', 'wallet_balance', 'is_active'],
    });

    const total_wallet_balance_per_branch = branches.map(branch => ({
      branch_id: branch.id,
      branch_name: branch.name,
      wallet_balance: Number(branch.wallet_balance),
    }));

    const total_wallet_balance_all_branches = total_wallet_balance_per_branch
      .reduce((sum, branch) => sum + branch.wallet_balance, 0);

    const active_count = branches.filter(branch => branch.is_active).length;
    const inactive_count = branches.filter(branch => !branch.is_active).length;

    return {
      total_wallet_balance_per_branch,
      total_wallet_balance_all_branches,
      active_count,
      inactive_count,
    };
  }

  async toggleStatus(id: number): Promise<Branch> {
    const branch = await this.findById(id);
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }

    const updatedBranch = new Branch({
      ...branch.value,
      is_active: !branch.value.is_active,
    });

    return this.update(updatedBranch);
  }

  async deleteMultiple(ids: number[]): Promise<{ message: string; deletedCount: number }> {
    const result = await this.branchRepo.softDelete(ids);
    return {
      message: `Successfully deleted ${result.affected || 0} branches`,
      deletedCount: result.affected || 0,
    };
  }
}
