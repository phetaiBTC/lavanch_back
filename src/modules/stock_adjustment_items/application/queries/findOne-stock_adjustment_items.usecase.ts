
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENT_ITEMS_REPOSITORY,
    type IStock_adjustment_itemsRepository,
  } from '../../domain/stock_adjustment_items.repository';
  import { Stock_adjustment_items } from '../../domain/stock_adjustment_items.entity';

@Injectable()
export class FindOneStock_adjustment_itemsUseCase {
  constructor(
 @Inject(STOCK_ADJUSTMENT_ITEMS_REPOSITORY)
      private readonly stock_adjustment_itemsRepository: IStock_adjustment_itemsRepository,
  ) {}

  async execute(id: number): Promise<Stock_adjustment_items> {
    const stock_adjustment_items = await this.stock_adjustment_itemsRepository.findById(id);
    if (!stock_adjustment_items) {
      throw new NotFoundException('Stock_adjustment_items not found');
    }
    return stock_adjustment_items;
  }
}
  
  