import { MemberTransaction } from './member-transaction.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

export const MEMBER_TRANSACTION_REPOSITORY = Symbol('MEMBER_TRANSACTION_REPOSITORY');

export interface IMemberTransactionRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<MemberTransaction>>;
  findById(id: number): Promise<MemberTransaction | null>;
  findByMember(memberId: number, query: PaginationDto): Promise<PaginatedResponse<MemberTransaction>>;
  create(transaction: MemberTransaction): Promise<MemberTransaction>;
}
