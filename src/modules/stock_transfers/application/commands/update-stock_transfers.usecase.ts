
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFERS_REPOSITORY,
    type IStock_transfersRepository,
  } from '../../domain/stock_transfers.repository';
  import { CreateStock_transfersDto } from '../../dto/create-stock_transfers.dto';
  import { Stock_transfers } from '../../domain/stock_transfers.entity';
import { FindOneStock_transfersUseCase } from '../queries/findOne-stock_transfers.usecase';

  import { UpdateStock_transfersDto } from '../../dto/update-stock_transfers.dto';

  @Injectable()
  export class UpdateStock_transfersUseCase {
    constructor(
      @Inject(STOCK_TRANSFERS_REPOSITORY)
      private readonly stock_transfersRepository: IStock_transfersRepository,
      private readonly stock_transfersGetOne: FindOneStock_transfersUseCase,
    ) {}

    async execute(id: number, body: UpdateStock_transfersDto): Promise<Stock_transfers> {
      const stock_transfers = await this.stock_transfersGetOne.execute(id);
      const update = stock_transfers.update({
        name: body.name,
      });
      return await this.stock_transfersRepository.save(update);
    }
  }