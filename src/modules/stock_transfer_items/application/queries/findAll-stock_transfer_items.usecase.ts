
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFER_ITEMS_REPOSITORY,
    type IStock_transfer_itemsRepository,
  } from '../../domain/stock_transfer_items.repository';
  import { Stock_transfer_items } from '../../domain/stock_transfer_items.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindStock_transfer_itemsUseCase {
  constructor(
 @Inject(STOCK_TRANSFER_ITEMS_REPOSITORY)
      private readonly stock_transfer_itemsRepository: IStock_transfer_itemsRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Stock_transfer_items>> {
    return await this.stock_transfer_itemsRepository.findAll(query);
  }
}
  
  