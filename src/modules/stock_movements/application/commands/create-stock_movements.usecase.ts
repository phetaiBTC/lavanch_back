
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_MOVEMENTS_REPOSITORY,
    type IStock_movementsRepository,
  } from '../../domain/stock_movements.repository';
  import { CreateStock_movementsDto } from '../../dto/create-stock_movements.dto';
  import { Stock_movements } from '../../domain/stock_movements.entity';

  @Injectable()
  export class CreateStock_movementsUseCase {
    constructor(
      @Inject(STOCK_MOVEMENTS_REPOSITORY)
      private readonly stock_movementsRepository: IStock_movementsRepository,
    ) {}

    async execute(body: CreateStock_movementsDto): Promise<Stock_movements> {
      const stock_movements = new Stock_movements({
        name: body.name,
      });
      return await this.stock_movementsRepository.save(stock_movements);
    }
  }
