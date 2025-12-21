
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENTS_REPOSITORY,
    type IStock_adjustmentsRepository,
  } from '../../domain/stock_adjustments.repository';
  import { CreateStock_adjustmentsDto } from '../../dto/create-stock_adjustments.dto';
  import { Stock_adjustments } from '../../domain/stock_adjustments.entity';
import { FindOneStock_adjustmentsUseCase } from '../queries/findOne-stock_adjustments.usecase';

  import { UpdateStock_adjustmentsDto } from '../../dto/update-stock_adjustments.dto';

  @Injectable()
  export class UpdateStock_adjustmentsUseCase {
    constructor(
      @Inject(STOCK_ADJUSTMENTS_REPOSITORY)
      private readonly stock_adjustmentsRepository: IStock_adjustmentsRepository,
      private readonly stock_adjustmentsGetOne: FindOneStock_adjustmentsUseCase,
    ) {}

    async execute(id: number, body: UpdateStock_adjustmentsDto): Promise<Stock_adjustments> {
      const stock_adjustments = await this.stock_adjustmentsGetOne.execute(id);
      const update = stock_adjustments.update({
        name: body.name,
      });
      return await this.stock_adjustmentsRepository.save(update);
    }
  }