
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_TRANSFERS_REPOSITORY,
    type IStock_transfersRepository,
  } from '../../domain/stock_transfers.repository';
  import { CreateStock_transfersDto } from '../../dto/create-stock_transfers.dto';
  import { Stock_transfers } from '../../domain/stock_transfers.entity';

  @Injectable()
  export class CreateStock_transfersUseCase {
    constructor(
      @Inject(STOCK_TRANSFERS_REPOSITORY)
      private readonly stock_transfersRepository: IStock_transfersRepository,
    ) {}

    async execute(body: CreateStock_transfersDto): Promise<Stock_transfers> {
      const stock_transfers = new Stock_transfers({
        name: body.name,
      });
      return await this.stock_transfersRepository.save(stock_transfers);
    }
  }
