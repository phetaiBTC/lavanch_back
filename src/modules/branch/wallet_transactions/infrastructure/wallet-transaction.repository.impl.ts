import { Injectable } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletTransactionsOrm } from 'src/database/typeorm/wallet_transactions.orm-entity';
import { IWalletTransactionRepository } from '../domain/wallet-transaction.repository';
import { WalletTransaction } from '../domain/wallet-transaction.entity';
import { WalletTransactionMapper } from './wallet-transaction.mapper';
import { FindWalletTransactionDto } from '../dto/find-wallet-transaction.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class WalletTransactionRepositoryImpl
  implements IWalletTransactionRepository
{
  constructor(
    @InjectRepository(WalletTransactionsOrm)
    private readonly transactionRepo: Repository<WalletTransactionsOrm>,
  ) {}

  async findAll(
    query: FindWalletTransactionDto,
  ): Promise<PaginatedResponse<WalletTransaction>> {
    const qb = this.transactionRepo
      .createQueryBuilder('wallet_transactions')
      .withDeleted()
      .leftJoinAndSelect('wallet_transactions.branch', 'branch')
      .leftJoinAndSelect('wallet_transactions.creator', 'creator')
      .leftJoinAndSelect('wallet_transactions.approver', 'approver');

    // Filter by search (reference_no or branch name)
    if (query.search) {
      qb.andWhere(
        '(wallet_transactions.reference_no LIKE :kw OR branch.name LIKE :kw)',
        {
          kw: `%${query.search}%`,
        },
      );
    }

    // Filter by branch_id
    if (query.branch_id) {
      qb.andWhere('wallet_transactions.branch_id = :branchId', {
        branchId: query.branch_id,
      });
    }

    // Filter by transaction_type
    if (query.transaction_type) {
      qb.andWhere('wallet_transactions.transaction_type = :transactionType', {
        transactionType: query.transaction_type,
      });
    }

    // Filter by transaction_status
    if (query.transaction_status) {
      qb.andWhere('wallet_transactions.status = :status', {
        status: query.transaction_status,
      });
    }

    // Filter by date range
    if (query.date_from && query.date_to) {
      qb.andWhere(
        'wallet_transactions.createdAt BETWEEN :dateFrom AND :dateTo',
        {
          dateFrom: new Date(query.date_from),
          dateTo: new Date(query.date_to + ' 23:59:59'),
        },
      );
    } else if (query.date_from) {
      qb.andWhere('wallet_transactions.createdAt >= :dateFrom', {
        dateFrom: new Date(query.date_from),
      });
    } else if (query.date_to) {
      qb.andWhere('wallet_transactions.createdAt <= :dateTo', {
        dateTo: new Date(query.date_to + ' 23:59:59'),
      });
    }

    // Filter by is_active (soft delete)
    if (query.is_active === 'active') {
      qb.andWhere('wallet_transactions.deletedAt IS NULL');
    } else if (query.is_active === 'inactive') {
      qb.andWhere('wallet_transactions.deletedAt IS NOT NULL');
    }

    // Sort
    qb.orderBy('wallet_transactions.createdAt', query.sort || 'DESC');

    // Pagination
    const skip = ((query.page || 1) - 1) * (query.limit || 10);
    const [entities, total] = await qb
      .skip(skip)
      .take(query.limit || 10)
      .getManyAndCount();

    const data = entities.map((entity) =>
      WalletTransactionMapper.toDomain(entity),
    );

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

  async findById(id: number): Promise<WalletTransaction | null> {
    const entity = await this.transactionRepo.findOne({
      where: { id },
      relations: ['branch', 'creator', 'approver'],
    });
    return entity ? WalletTransactionMapper.toDomain(entity) : null;
  }

  async create(transaction: WalletTransaction): Promise<WalletTransaction> {
    const entity = this.transactionRepo.create(
      WalletTransactionMapper.toSchema(transaction),
    );
    const saved = await this.transactionRepo.save(entity);
    return WalletTransactionMapper.toDomain(saved);
  }

  async update(transaction: WalletTransaction): Promise<WalletTransaction> {
    const saved = await this.transactionRepo.save(
      WalletTransactionMapper.toSchema(transaction),
    );
    return WalletTransactionMapper.toDomain(saved);
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    await this.transactionRepo.delete(id);
    return { message: 'hard delete successfully' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    await this.transactionRepo.softDelete(id);
    return { message: 'soft delete successfully' };
  }

  async restore(id: number): Promise<{ message: string }> {
    await this.transactionRepo.restore(id);
    return { message: 'restore successfully' };
  }
}
