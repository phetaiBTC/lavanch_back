
import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFERS_REPOSITORY,
    type IStock_transfersRepository,
  } from '../../domain/stock_transfers.repository';
import { FindOneStock_transfersUseCase } from '../queries/findOne-stock_transfers.usecase';


@Injectable()
export class SoftDeleteStock_transfersUseCase {
  constructor(
      @Inject(STOCK_TRANSFERS_REPOSITORY)
      private readonly stock_transfersRepository: IStock_transfersRepository,
      private readonly stock_transfersGetOne: FindOneStock_transfersUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.stock_transfersGetOne.execute(id)));
    return await this.stock_transfersRepository.softDelete(id);
  }
}
  
  