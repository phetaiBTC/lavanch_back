
import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENT_ITEMS_REPOSITORY,
    type IStock_adjustment_itemsRepository,
  } from '../../domain/stock_adjustment_items.repository';
import { FindOneStock_adjustment_itemsUseCase } from '../queries/findOne-stock_adjustment_items.usecase';


@Injectable()
export class SoftDeleteStock_adjustment_itemsUseCase {
  constructor(
      @Inject(STOCK_ADJUSTMENT_ITEMS_REPOSITORY)
      private readonly stock_adjustment_itemsRepository: IStock_adjustment_itemsRepository,
      private readonly stock_adjustment_itemsGetOne: FindOneStock_adjustment_itemsUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.stock_adjustment_itemsGetOne.execute(id)));
    return await this.stock_adjustment_itemsRepository.softDelete(id);
  }
}
  
  