import { Injectable, Inject } from '@nestjs/common';
import { MEMBER_TRANSACTION_REPOSITORY, type IMemberTransactionRepository } from '../../domain/member-transaction.repository';
import { MemberTransaction } from '../../domain/member-transaction.entity';

@Injectable()
export class FindOneMemberTransactionUseCase {
  constructor(
    @Inject(MEMBER_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IMemberTransactionRepository,
  ) {}

  async execute(id: number): Promise<MemberTransaction | null> {
    return await this.transactionRepo.findById(id);
  }
}
