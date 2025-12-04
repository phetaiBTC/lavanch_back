import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  WALLET_TRANSACTION_REPOSITORY,
  type IWalletTransactionRepository,
} from '../../domain/wallet-transaction.repository';
import { WalletTransaction } from '../../domain/wallet-transaction.entity';

@Injectable()
export class FindOneWalletTransactionUseCase {
  constructor(
    @Inject(WALLET_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IWalletTransactionRepository,
  ) {}

  async execute(id: number): Promise<WalletTransaction> {
    const transaction = await this.transactionRepo.findById(id);
    if (!transaction)
      throw new NotFoundException('Wallet transaction not found');
    return transaction;
  }
}
