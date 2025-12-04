import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletAdjustmentsOrm } from 'src/database/typeorm/wallet_adjustments.orm-entity';
import { IWalletAdjustmentRepository } from '../domain/wallet-adjustment.repository';
import { WalletAdjustment } from '../domain/wallet-adjustment.entity';
import { WalletAdjustmentMapper } from './wallet-adjustment.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class WalletAdjustmentRepositoryImpl
  implements IWalletAdjustmentRepository
{
  constructor(
    @InjectRepository(WalletAdjustmentsOrm)
    private readonly adjustmentRepo: Repository<WalletAdjustmentsOrm>,
  ) {}

  async findAll(
    query: PaginationDto,
  ): Promise<
    PaginatedResponse<WalletAdjustment & { _orm?: WalletAdjustmentsOrm }>
  > {
    const qb = this.adjustmentRepo
      .createQueryBuilder('wallet_adjustments')
      .withDeleted()
      .leftJoinAndSelect('wallet_adjustments.branch', 'branch')
      .leftJoinAndSelect('wallet_adjustments.creator', 'creator');

    if (query.search) {
      qb.andWhere(`wallet_adjustments.adjustment_no LIKE :kw`, {
        kw: `%${query.search}%`,
      });
    }

    if (query.is_active === 'active') {
      qb.andWhere(`wallet_adjustments.deletedAt IS NULL`);
    } else if (query.is_active === 'inactive') {
      qb.andWhere(`wallet_adjustments.deletedAt IS NOT NULL`);
    }

    qb.orderBy(`wallet_adjustments.createdAt`, query.sort || 'DESC');

    const skip = ((query.page || 1) - 1) * (query.limit || 10);
    const [entities, total] = await qb
      .skip(skip)
      .take(query.limit || 10)
      .getManyAndCount();

    // Map to domain with ORM data attached
    const data = entities.map((entity) => {
      const domain = WalletAdjustmentMapper.toDomain(entity);
      (domain as any)._orm = entity;
      return domain as WalletAdjustment & { _orm?: WalletAdjustmentsOrm };
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

  async findByBranch(
    branchId: number,
    query: PaginationDto,
  ): Promise<PaginatedResponse<WalletAdjustment>> {
    const qb = this.adjustmentRepo
      .createQueryBuilder('wallet_adjustments')
      .withDeleted()
      .leftJoinAndSelect('wallet_adjustments.branch', 'branch')
      .where('wallet_adjustments.branch_id = :branchId', { branchId });

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'wallet_adjustments.adjustment_no' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: WalletAdjustmentMapper.toDomain,
    });
  }

  async findById(id: number): Promise<WalletAdjustment | null> {
    const entity = await this.adjustmentRepo.findOne({
      where: { id },
      relations: ['branch', 'creator', 'approver'],
    });
    return entity ? WalletAdjustmentMapper.toDomain(entity) : null;
  }

  async generateAdjustmentNo(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const prefix = `ADJ${year}${month}`;

    const lastAdjustment = await this.adjustmentRepo
      .createQueryBuilder('adjustment')
      .where('adjustment.adjustment_no LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('adjustment.adjustment_no', 'DESC')
      .getOne();

    if (!lastAdjustment) {
      return `${prefix}0001`;
    }

    const lastNumber = parseInt(lastAdjustment.adjustment_no.slice(-4));
    const nextNumber = String(lastNumber + 1).padStart(4, '0');
    return `${prefix}${nextNumber}`;
  }

  async create(adjustment: WalletAdjustment): Promise<WalletAdjustment> {
    const entity = this.adjustmentRepo.create(
      WalletAdjustmentMapper.toSchema(adjustment),
    );
    const saved = await this.adjustmentRepo.save(entity);
    return WalletAdjustmentMapper.toDomain(saved);
  }

  async update(adjustment: WalletAdjustment): Promise<WalletAdjustment> {
    const saved = await this.adjustmentRepo.save(
      WalletAdjustmentMapper.toSchema(adjustment),
    );
    return WalletAdjustmentMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.adjustmentRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    await this.adjustmentRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.adjustmentRepo.restore(id);
    return { message: 'restore successfully' };
  }
}
