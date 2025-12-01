import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberTransactionsOrm } from 'src/database/typeorm/member_transactions.orm-entity';
import { IMemberTransactionRepository } from '../domain/member-transaction.repository';
import { MemberTransaction } from '../domain/member-transaction.entity';
import { MemberTransactionMapper } from './member-transaction.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { fetchWithPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class MemberTransactionRepositoryImpl implements IMemberTransactionRepository {
  constructor(
    @InjectRepository(MemberTransactionsOrm)
    private readonly transactionRepo: Repository<MemberTransactionsOrm>,
  ) {}

  async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<MemberTransaction>> {
    const qb = this.transactionRepo
      .createQueryBuilder('member_transactions')
      .withDeleted()
      .orderBy('member_transactions.date', 'DESC');

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'type' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: MemberTransactionMapper.toDomain,
    });
  }

  async findById(id: number): Promise<MemberTransaction | null> {
    const entity = await this.transactionRepo.findOne({ where: { id } });
    return entity ? MemberTransactionMapper.toDomain(entity) : null;
  }

  async findByMember(
    memberId: number,
    query: PaginationDto,
  ): Promise<PaginatedResponse<MemberTransaction>> {
    const qb = this.transactionRepo
      .createQueryBuilder('member_transactions')
      .where('member_transactions.member_id = :memberId', { memberId })
      .orderBy('member_transactions.date', 'DESC');

    return await fetchWithPagination({
      qb,
      page: query.page || 1,
      type: query.type,
      search: { kw: query.search, field: 'type' },
      is_active: query.is_active,
      sort: query.sort,
      limit: query.limit || 10,
      toDomain: MemberTransactionMapper.toDomain,
    });
  }

  async create(transaction: MemberTransaction): Promise<MemberTransaction> {
    const entity = this.transactionRepo.create(
      MemberTransactionMapper.toSchema(transaction),
    );
    const saved = await this.transactionRepo.save(entity);
    return MemberTransactionMapper.toDomain(saved);
  }
}
