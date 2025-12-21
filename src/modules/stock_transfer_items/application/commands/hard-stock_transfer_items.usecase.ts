
import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFER_ITEMS_REPOSITORY,
    type IStock_transfer_itemsRepository,
  } from '../../domain/stock_transfer_items.repository';
import { FindOneStock_transfer_itemsUseCase } from '../queries/findOne-stock_transfer_items.usecase';


@Injectable()
export class HardDeleteStock_transfer_itemsUseCase {
  constructor(
      @Inject(STOCK_TRANSFER_ITEMS_REPOSITORY)
      private readonly stock_transfer_itemsRepository: IStock_transfer_itemsRepository,
      private readonly stock_transfer_itemsGetOne: FindOneStock_transfer_itemsUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.stock_transfer_itemsGetOne.execute(id)));
    return await this.stock_transfer_itemsRepository.hardDelete(id);
  }
}
  
  