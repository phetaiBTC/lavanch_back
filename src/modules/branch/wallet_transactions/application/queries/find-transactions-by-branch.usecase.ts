import { Injectable, Inject } from '@nestjs/common';
import {
  WALLET_TRANSACTION_REPOSITORY,
  type IWalletTransactionRepository,
} from '../../domain/wallet-transaction.repository';
import { FindWalletTransactionDto } from '../../dto/find-wallet-transaction.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletTransaction } from '../../domain/wallet-transaction.entity';

@Injectable()
export class FindTransactionsByBranchUseCase {
  constructor(
    @Inject(WALLET_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IWalletTransactionRepository,
  ) {}

  async execute(
    branchId: number,
    query: FindWalletTransactionDto,
  ): Promise<PaginatedResponse<WalletTransaction>> {
    // Set branch_id in query if provided via parameter
    const queryWithBranch = { ...query, branch_id: branchId };
    return this.transactionRepo.findAll(queryWithBranch);
  }
}
