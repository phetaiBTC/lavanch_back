
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENT_ITEMS_REPOSITORY,
    type IStock_adjustment_itemsRepository,
  } from '../../domain/stock_adjustment_items.repository';
  import { CreateStock_adjustment_itemsDto } from '../../dto/create-stock_adjustment_items.dto';
  import { Stock_adjustment_items } from '../../domain/stock_adjustment_items.entity';

  @Injectable()
  export class CreateStock_adjustment_itemsUseCase {
    constructor(
      @Inject(STOCK_ADJUSTMENT_ITEMS_REPOSITORY)
      private readonly stock_adjustment_itemsRepository: IStock_adjustment_itemsRepository,
    ) {}

    async execute(body: CreateStock_adjustment_itemsDto): Promise<Stock_adjustment_items> {
      const stock_adjustment_items = new Stock_adjustment_items({
        name: body.name,
      });
      return await this.stock_adjustment_itemsRepository.save(stock_adjustment_items);
    }
  }
