
import { Inject, Injectable } from '@nestjs/common';
  import {
    BRANCH_STOCKS_REPOSITORY,
    type IBranch_stocksRepository,
  } from '../../domain/branch_stocks.repository';
import { FindOneBranch_stocksUseCase } from '../queries/findOne-branch_stocks.usecase';


@Injectable()
export class HardDeleteBranch_stocksUseCase {
  constructor(
      @Inject(BRANCH_STOCKS_REPOSITORY)
      private readonly branch_stocksRepository: IBranch_stocksRepository,
      private readonly branch_stocksGetOne: FindOneBranch_stocksUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.branch_stocksGetOne.execute(id)));
    return await this.branch_stocksRepository.hardDelete(id);
  }
}
  
  