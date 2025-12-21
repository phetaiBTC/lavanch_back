
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENTS_REPOSITORY,
    type IStock_adjustmentsRepository,
  } from '../../domain/stock_adjustments.repository';
  import { CreateStock_adjustmentsDto } from '../../dto/create-stock_adjustments.dto';
  import { Stock_adjustments } from '../../domain/stock_adjustments.entity';

  @Injectable()
  export class CreateStock_adjustmentsUseCase {
    constructor(
      @Inject(STOCK_ADJUSTMENTS_REPOSITORY)
      private readonly stock_adjustmentsRepository: IStock_adjustmentsRepository,
    ) {}

    async execute(body: CreateStock_adjustmentsDto): Promise<Stock_adjustments> {
      const stock_adjustments = new Stock_adjustments({
        name: body.name,
      });
      return await this.stock_adjustmentsRepository.save(stock_adjustments);
    }
  }
