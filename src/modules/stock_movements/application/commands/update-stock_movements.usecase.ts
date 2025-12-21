
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_MOVEMENTS_REPOSITORY,
    type IStock_movementsRepository,
  } from '../../domain/stock_movements.repository';
  import { CreateStock_movementsDto } from '../../dto/create-stock_movements.dto';
  import { Stock_movements } from '../../domain/stock_movements.entity';
import { FindOneStock_movementsUseCase } from '../queries/findOne-stock_movements.usecase';

  import { UpdateStock_movementsDto } from '../../dto/update-stock_movements.dto';

  @Injectable()
  export class UpdateStock_movementsUseCase {
    constructor(
      @Inject(STOCK_MOVEMENTS_REPOSITORY)
      private readonly stock_movementsRepository: IStock_movementsRepository,
      private readonly stock_movementsGetOne: FindOneStock_movementsUseCase,
    ) {}

    async execute(id: number, body: UpdateStock_movementsDto): Promise<Stock_movements> {
      const stock_movements = await this.stock_movementsGetOne.execute(id);
      const update = stock_movements.update({
        name: body.name,
      });
      return await this.stock_movementsRepository.save(update);
    }
  }