
  
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
import { Stock_transfer_items } from './domain/stock_transfer_items.entity';
import { Stock_transfer_itemsOrm } from 'src/database/typeorm/stock_transfer_items.orm-entity';
import { Stock_transfer_itemsResponse } from './interface/stock_transfer_items.interface';
import { Stock_transfer_itemsMapper } from './infrastructure/stock_transfer_items.mapper';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { CreateStock_transfer_itemsDto } from './dto/create-stock_transfer_items.dto';
import { UpdateStock_transfer_itemsDto } from './dto/update-stock_transfer_items.dto';
import { CreateStock_transfer_itemsUseCase } from './application/commands/create-stock_transfer_items.usecase';
import { UpdateStock_transfer_itemsUseCase } from './application/commands/update-stock_transfer_items.usecase';
import { FindOneStock_transfer_itemsUseCase } from './application/queries/findOne-stock_transfer_items.usecase';
import { FindStock_transfer_itemsUseCase } from './application/queries/findAll-stock_transfer_items.usecase';
import { HardDeleteStock_transfer_itemsUseCase } from './application/commands/hard-stock_transfer_items.usecase';
import { SoftDeleteStock_transfer_itemsUseCase } from './application/commands/soft-stock_transfer_items.usecase';
import { RestoreStock_transfer_itemsUseCase } from './application/commands/restore-stock_transfer_items.usecase';

@Controller('stock_transfer_items')
export class Stock_transfer_itemsController extends BaseController<
  Stock_transfer_items,
  Stock_transfer_itemsOrm,
  Stock_transfer_itemsResponse,
  CreateStock_transfer_itemsDto,
  UpdateStock_transfer_itemsDto
> {
  constructor(
    private readonly createStock_transfer_itemsUseCase: CreateStock_transfer_itemsUseCase,
    private readonly updateStock_transfer_itemsUseCase: UpdateStock_transfer_itemsUseCase,
    protected readonly getOneStock_transfer_itemsUseCase: FindOneStock_transfer_itemsUseCase,
    private readonly getStock_transfer_itemsUseCase: FindStock_transfer_itemsUseCase,
    protected readonly hardDeleteStock_transfer_itemsUseCase: HardDeleteStock_transfer_itemsUseCase,
    protected readonly softDeleteStock_transfer_itemsUseCase: SoftDeleteStock_transfer_itemsUseCase,
    protected readonly restoreStock_transfer_itemsUseCase: RestoreStock_transfer_itemsUseCase,
  ) {
    super({
      mapper: Stock_transfer_itemsMapper,
      findOne: getOneStock_transfer_itemsUseCase,
      hardDelete: hardDeleteStock_transfer_itemsUseCase,
      softDelete: softDeleteStock_transfer_itemsUseCase,
      restore: restoreStock_transfer_itemsUseCase,
    });
  }

  @Post('')
  async create(@Body() body: CreateStock_transfer_itemsDto): Promise<Stock_transfer_itemsResponse> {
    return Stock_transfer_itemsMapper.toResponse(await this.createStock_transfer_itemsUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Stock_transfer_itemsResponse>> {
    return Stock_transfer_itemsMapper.toResponseList(await this.getStock_transfer_itemsUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateStock_transfer_itemsDto,
  ): Promise<Stock_transfer_itemsResponse> {
    return Stock_transfer_itemsMapper.toResponse(await this.updateStock_transfer_itemsUseCase.execute(id, dto));
  }
}
  
  
  