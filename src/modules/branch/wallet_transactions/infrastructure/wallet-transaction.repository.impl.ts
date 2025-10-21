import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletTransactionsOrm } from 'src/database/typeorm/wallet_transactions.orm-entity';
import { IWalletTransactionRepository } from '../domain/wallet-transaction.repository';
import { WalletTransaction } from '../domain/wallet-transaction.entity';
import { WalletTransactionMapper } from './wallet-transaction.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class WalletTransactionRepositoryImpl implements IWalletTransactionRepository {
  constructor(
    @InjectRepository(WalletTransactionsOrm)
    private readonly transactionRepo: Repository<WalletTransactionsOrm>,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<WalletTransaction>> {
    const qb = this.transactionRepo
      .createQueryBuilder('wallet_transactions')
      .withDeleted()
      .leftJoinAndSelect('wallet_transactions.branch', 'branch')
      .leftJoinAndSelect('wallet_transactions.creator', 'creator')
      .leftJoinAndSelect('wallet_transactions.approver', 'approver');

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'wallet_transactions.reference_no' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: WalletTransactionMapper.toDomain,
    });
  }

  async findByBranch(
    branchId: number,
    query: PaginationDto,
  ): Promise<PaginatedResponse<WalletTransaction>> {
    const qb = this.transactionRepo
      .createQueryBuilder('wallet_transactions')
      .withDeleted()
      .leftJoinAndSelect('wallet_transactions.branch', 'branch')
      .leftJoinAndSelect('wallet_transactions.creator', 'creator')
      .leftJoinAndSelect('wallet_transactions.approver', 'approver')
      .where('wallet_transactions.branch_id = :branchId', { branchId });

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'wallet_transactions.reference_no' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: WalletTransactionMapper.toDomain,
    });
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
