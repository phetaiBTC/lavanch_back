
  import { Inject, Injectable } from '@nestjs/common';
  import {
    BRANCH_STOCKS_REPOSITORY,
    type IBranch_stocksRepository,
  } from '../../domain/branch_stocks.repository';
  import { CreateBranch_stocksDto } from '../../dto/create-branch_stocks.dto';
  import { Branch_stocks } from '../../domain/branch_stocks.entity';

  @Injectable()
  export class CreateBranch_stocksUseCase {
    constructor(
      @Inject(BRANCH_STOCKS_REPOSITORY)
      private readonly branch_stocksRepository: IBranch_stocksRepository,
    ) {}

    async execute(body: CreateBranch_stocksDto): Promise<Branch_stocks> {
      const branch_stocks = new Branch_stocks({
        name: body.name,
      });
      return await this.branch_stocksRepository.save(branch_stocks);
    }
  }
