
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    STOCK_TRANSFERS_REPOSITORY,
    type IStock_transfersRepository,
  } from '../../domain/stock_transfers.repository';
  import { Stock_transfers } from '../../domain/stock_transfers.entity';

@Injectable()
export class FindOneStock_transfersUseCase {
  constructor(
 @Inject(STOCK_TRANSFERS_REPOSITORY)
      private readonly stock_transfersRepository: IStock_transfersRepository,
  ) {}

  async execute(id: number): Promise<Stock_transfers> {
    const stock_transfers = await this.stock_transfersRepository.findById(id);
    if (!stock_transfers) {
      throw new NotFoundException('Stock_transfers not found');
    }
    return stock_transfers;
  }
}
  
  