import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesOrm } from 'src/database/typeorm/branches.orm-entity';
import { IBranchRepository } from '../domain/branch.repository';
import { Branch } from '../domain/branch.entity';
import { BranchMapper } from './branch.mapper';
import { PaginationDto, Status } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

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

    if (query.is_active === Status.ACTIVE) {
      qb.andWhere(`branches.deletedAt IS NULL`);
    } else if (query.is_active === Status.INACTIVE) {
      qb.andWhere(`branches.deletedAt IS NOT NULL`);
    }

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
    await this.branchRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.branchRepo.restore(id);
    return { message: 'restore successfully' };
  }
}
