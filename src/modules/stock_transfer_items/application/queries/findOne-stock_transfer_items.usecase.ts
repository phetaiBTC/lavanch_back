
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    STOCK_TRANSFER_ITEMS_REPOSITORY,
    type IStock_transfer_itemsRepository,
  } from '../../domain/stock_transfer_items.repository';
  import { Stock_transfer_items } from '../../domain/stock_transfer_items.entity';

@Injectable()
export class FindOneStock_transfer_itemsUseCase {
  constructor(
 @Inject(STOCK_TRANSFER_ITEMS_REPOSITORY)
      private readonly stock_transfer_itemsRepository: IStock_transfer_itemsRepository,
  ) {}

  async execute(id: number): Promise<Stock_transfer_items> {
    const stock_transfer_items = await this.stock_transfer_itemsRepository.findById(id);
    if (!stock_transfer_items) {
      throw new NotFoundException('Stock_transfer_items not found');
    }
    return stock_transfer_items;
  }
}
  
  