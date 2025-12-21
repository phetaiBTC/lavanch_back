
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    BRANCH_STOCKS_REPOSITORY,
    type IBranch_stocksRepository,
  } from '../../domain/branch_stocks.repository';
  import { Branch_stocks } from '../../domain/branch_stocks.entity';

@Injectable()
export class FindOneBranch_stocksUseCase {
  constructor(
 @Inject(BRANCH_STOCKS_REPOSITORY)
      private readonly branch_stocksRepository: IBranch_stocksRepository,
  ) {}

  async execute(id: number): Promise<Branch_stocks> {
    const branch_stocks = await this.branch_stocksRepository.findById(id);
    if (!branch_stocks) {
      throw new NotFoundException('Branch_stocks not found');
    }
    return branch_stocks;
  }
}
  
  