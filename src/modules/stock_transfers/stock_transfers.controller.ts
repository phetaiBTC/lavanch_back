
  
import {
  Body,
  Controller,
  Param,
  Patch,
  Query,
  Post,
  Get,
} from '@nestjs/common';

import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Stock_transfers } from './domain/stock_transfers.entity';
import { Stock_transfersOrm } from 'src/database/typeorm/stock_transfers.orm-entity';
import { Stock_transfersResponse } from './interface/stock_transfers.interface';
import { Stock_transfersMapper } from './infrastructure/stock_transfers.mapper';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { CreateStock_transfersDto } from './dto/create-stock_transfers.dto';
import { UpdateStock_transfersDto } from './dto/update-stock_transfers.dto';
import { CreateStock_transfersUseCase } from './application/commands/create-stock_transfers.usecase';
import { UpdateStock_transfersUseCase } from './application/commands/update-stock_transfers.usecase';
import { FindOneStock_transfersUseCase } from './application/queries/findOne-stock_transfers.usecase';
import { FindStock_transfersUseCase } from './application/queries/findAll-stock_transfers.usecase';
import { HardDeleteStock_transfersUseCase } from './application/commands/hard-stock_transfers.usecase';
import { SoftDeleteStock_transfersUseCase } from './application/commands/soft-stock_transfers.usecase';
import { RestoreStock_transfersUseCase } from './application/commands/restore-stock_transfers.usecase';

@Controller('stock_transfers')
export class Stock_transfersController extends BaseController<
  Stock_transfers,
  Stock_transfersOrm,
  Stock_transfersResponse,
  CreateStock_transfersDto,
  UpdateStock_transfersDto
> {
  constructor(
    private readonly createStock_transfersUseCase: CreateStock_transfersUseCase,
    private readonly updateStock_transfersUseCase: UpdateStock_transfersUseCase,
    protected readonly getOneStock_transfersUseCase: FindOneStock_transfersUseCase,
    private readonly getStock_transfersUseCase: FindStock_transfersUseCase,
    protected readonly hardDeleteStock_transfersUseCase: HardDeleteStock_transfersUseCase,
    protected readonly softDeleteStock_transfersUseCase: SoftDeleteStock_transfersUseCase,
    protected readonly restoreStock_transfersUseCase: RestoreStock_transfersUseCase,
  ) {
    super({
      mapper: Stock_transfersMapper,
      findOne: getOneStock_transfersUseCase,
      hardDelete: hardDeleteStock_transfersUseCase,
      softDelete: softDeleteStock_transfersUseCase,
      restore: restoreStock_transfersUseCase,
    });
  }

  @Post('')
  async create(@Body() body: CreateStock_transfersDto): Promise<Stock_transfersResponse> {
    return Stock_transfersMapper.toResponse(await this.createStock_transfersUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Stock_transfersResponse>> {
    return Stock_transfersMapper.toResponseList(await this.getStock_transfersUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateStock_transfersDto,
  ): Promise<Stock_transfersResponse> {
    return Stock_transfersMapper.toResponse(await this.updateStock_transfersUseCase.execute(id, dto));
  }
}
  
  
  