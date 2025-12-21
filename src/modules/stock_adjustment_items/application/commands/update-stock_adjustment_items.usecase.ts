
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENT_ITEMS_REPOSITORY,
    type IStock_adjustment_itemsRepository,
  } from '../../domain/stock_adjustment_items.repository';
  import { CreateStock_adjustment_itemsDto } from '../../dto/create-stock_adjustment_items.dto';
  import { Stock_adjustment_items } from '../../domain/stock_adjustment_items.entity';
import { FindOneStock_adjustment_itemsUseCase } from '../queries/findOne-stock_adjustment_items.usecase';

  import { UpdateStock_adjustment_itemsDto } from '../../dto/update-stock_adjustment_items.dto';

  @Injectable()
  export class UpdateStock_adjustment_itemsUseCase {
    constructor(
      @Inject(STOCK_ADJUSTMENT_ITEMS_REPOSITORY)
      private readonly stock_adjustment_itemsRepository: IStock_adjustment_itemsRepository,
      private readonly stock_adjustment_itemsGetOne: FindOneStock_adjustment_itemsUseCase,
    ) {}

    async execute(id: number, body: UpdateStock_adjustment_itemsDto): Promise<Stock_adjustment_items> {
      const stock_adjustment_items = await this.stock_adjustment_itemsGetOne.execute(id);
      const update = stock_adjustment_items.update({
        name: body.name,
      });
      return await this.stock_adjustment_itemsRepository.save(update);
    }
  }