
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFER_ITEMS_REPOSITORY,
    type IStock_transfer_itemsRepository,
  } from '../../domain/stock_transfer_items.repository';
  import { CreateStock_transfer_itemsDto } from '../../dto/create-stock_transfer_items.dto';
  import { Stock_transfer_items } from '../../domain/stock_transfer_items.entity';
import { FindOneStock_transfer_itemsUseCase } from '../queries/findOne-stock_transfer_items.usecase';

  import { UpdateStock_transfer_itemsDto } from '../../dto/update-stock_transfer_items.dto';

  @Injectable()
  export class UpdateStock_transfer_itemsUseCase {
    constructor(
      @Inject(STOCK_TRANSFER_ITEMS_REPOSITORY)
      private readonly stock_transfer_itemsRepository: IStock_transfer_itemsRepository,
      private readonly stock_transfer_itemsGetOne: FindOneStock_transfer_itemsUseCase,
    ) {}

    async execute(id: number, body: UpdateStock_transfer_itemsDto): Promise<Stock_transfer_items> {
      const stock_transfer_items = await this.stock_transfer_itemsGetOne.execute(id);
      const update = stock_transfer_items.update({
        name: body.name,
      });
      return await this.stock_transfer_itemsRepository.save(update);
    }
  }