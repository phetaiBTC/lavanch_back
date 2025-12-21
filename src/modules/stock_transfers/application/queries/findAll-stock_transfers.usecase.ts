
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFERS_REPOSITORY,
    type IStock_transfersRepository,
  } from '../../domain/stock_transfers.repository';
  import { Stock_transfers } from '../../domain/stock_transfers.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindStock_transfersUseCase {
  constructor(
 @Inject(STOCK_TRANSFERS_REPOSITORY)
      private readonly stock_transfersRepository: IStock_transfersRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Stock_transfers>> {
    return await this.stock_transfersRepository.findAll(query);
  }
}
  
  