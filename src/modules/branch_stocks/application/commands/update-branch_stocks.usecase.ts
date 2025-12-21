
  import { Inject, Injectable } from '@nestjs/common';
  import {
    BRANCH_STOCKS_REPOSITORY,
    type IBranch_stocksRepository,
  } from '../../domain/branch_stocks.repository';
  import { CreateBranch_stocksDto } from '../../dto/create-branch_stocks.dto';
  import { Branch_stocks } from '../../domain/branch_stocks.entity';
import { FindOneBranch_stocksUseCase } from '../queries/findOne-branch_stocks.usecase';

  import { UpdateBranch_stocksDto } from '../../dto/update-branch_stocks.dto';

  @Injectable()
  export class UpdateBranch_stocksUseCase {
    constructor(
      @Inject(BRANCH_STOCKS_REPOSITORY)
      private readonly branch_stocksRepository: IBranch_stocksRepository,
      private readonly branch_stocksGetOne: FindOneBranch_stocksUseCase,
    ) {}

    async execute(id: number, body: UpdateBranch_stocksDto): Promise<Branch_stocks> {
      const branch_stocks = await this.branch_stocksGetOne.execute(id);
      const update = branch_stocks.update({
        name: body.name,
      });
      return await this.branch_stocksRepository.save(update);
    }
  }