
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    BRANCH_STOCKS_REPOSITORY,
    type IBranch_stocksRepository,
  } from '../../domain/branch_stocks.repository';
  import { Branch_stocks } from '../../domain/branch_stocks.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindBranch_stocksUseCase {
  constructor(
 @Inject(BRANCH_STOCKS_REPOSITORY)
      private readonly branch_stocksRepository: IBranch_stocksRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Branch_stocks>> {
    return await this.branch_stocksRepository.findAll(query);
  }
}
  
  