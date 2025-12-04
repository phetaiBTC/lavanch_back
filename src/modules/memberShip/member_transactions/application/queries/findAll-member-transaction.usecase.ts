import { Injectable, Inject } from '@nestjs/common';
import {
  MEMBER_TRANSACTION_REPOSITORY,
  type IMemberTransactionRepository,
} from '../../domain/member-transaction.repository';
import { MemberTransaction } from '../../domain/member-transaction.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindAllMemberTransactionUseCase {
  constructor(
    @Inject(MEMBER_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IMemberTransactionRepository,
  ) {}

  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<MemberTransaction>> {
    return await this.transactionRepo.findAll(query);
  }
}
