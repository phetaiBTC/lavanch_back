
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFER_ITEMS_REPOSITORY,
    type IStock_transfer_itemsRepository,
  } from '../../domain/stock_transfer_items.repository';
  import { CreateStock_transfer_itemsDto } from '../../dto/create-stock_transfer_items.dto';
  import { Stock_transfer_items } from '../../domain/stock_transfer_items.entity';

  @Injectable()
  export class CreateStock_transfer_itemsUseCase {
    constructor(
      @Inject(STOCK_TRANSFER_ITEMS_REPOSITORY)
      private readonly stock_transfer_itemsRepository: IStock_transfer_itemsRepository,
    ) {}

    async execute(body: CreateStock_transfer_itemsDto): Promise<Stock_transfer_items> {
      const stock_transfer_items = new Stock_transfer_items({
        name: body.name,
      });
      return await this.stock_transfer_itemsRepository.save(stock_transfer_items);
    }
  }
