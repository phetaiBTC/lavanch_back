import { Injectable, Inject } from '@nestjs/common';
import {
  WALLET_TRANSACTION_REPOSITORY,
  type IWalletTransactionRepository,
} from '../../domain/wallet-transaction.repository';
import { FindWalletTransactionDto } from '../../dto/find-wallet-transaction.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { WalletTransaction } from '../../domain/wallet-transaction.entity';

@Injectable()
export class FindAllWalletTransactionUseCase {
  constructor(
    @Inject(WALLET_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IWalletTransactionRepository,
  ) {}

  async execute(
    query: FindWalletTransactionDto,
  ): Promise<PaginatedResponse<WalletTransaction>> {
    return this.transactionRepo.findAll(query);
  }
}
