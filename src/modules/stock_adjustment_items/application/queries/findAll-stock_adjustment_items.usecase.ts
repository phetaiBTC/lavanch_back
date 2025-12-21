
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENT_ITEMS_REPOSITORY,
    type IStock_adjustment_itemsRepository,
  } from '../../domain/stock_adjustment_items.repository';
  import { Stock_adjustment_items } from '../../domain/stock_adjustment_items.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindStock_adjustment_itemsUseCase {
  constructor(
 @Inject(STOCK_ADJUSTMENT_ITEMS_REPOSITORY)
      private readonly stock_adjustment_itemsRepository: IStock_adjustment_itemsRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Stock_adjustment_items>> {
    return await this.stock_adjustment_itemsRepository.findAll(query);
  }
}
  
  