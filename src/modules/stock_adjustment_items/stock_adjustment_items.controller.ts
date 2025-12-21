
  
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
import { Stock_adjustment_items } from './domain/stock_adjustment_items.entity';
import { Stock_adjustment_itemsOrm } from 'src/database/typeorm/stock_adjustment_items.orm-entity';
import { Stock_adjustment_itemsResponse } from './interface/stock_adjustment_items.interface';
import { CreateStock_adjustment_itemsDto } from './dto/create-stock_adjustment_items.dto';
import { UpdateStock_adjustment_itemsDto } from './dto/update-stock_adjustment_items.dto';
import { CreateStock_adjustment_itemsUseCase } from './application/commands/create-stock_adjustment_items.usecase';
import { UpdateStock_adjustment_itemsUseCase } from './application/commands/update-stock_adjustment_items.usecase';
import { FindOneStock_adjustment_itemsUseCase } from './application/queries/getOne-stock_adjustment_items.usecase';
import { FindStock_adjustment_itemsUseCase } from './application/queries/get-stock_adjustment_items.usecase';
import { Stock_adjustment_itemsMapper } from './infrastructure/stock_adjustment_items.mapper';
import { RestoreStock_adjustment_itemsUseCase } from './application/commands/restore-stock_adjustment_items.usecase';
import { SoftDeleteStock_adjustment_itemsUseCase } from './application/commands/soft-stock_adjustment_items.usecase';
import { HardDeleteStock_adjustment_itemsUseCase } from './application/commands/hard-stock_adjustment_items.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';

@Controller('stock_adjustment_items')
export class Stock_adjustment_itemsController extends BaseController<
  Stock_adjustment_items,
  Stock_adjustment_itemsOrm,
  Stock_adjustment_itemsResponse,
  CreateStock_adjustment_itemsDto,
  UpdateStock_adjustment_itemsDto
> {
  constructor(
    private readonly createStock_adjustment_itemsUseCase: CreateStock_adjustment_itemsUseCase,
    private readonly updateStock_adjustment_itemsUseCase: UpdateStock_adjustment_itemsUseCase,
    protected readonly findOneStock_adjustment_itemsUseCase: FindOneStock_adjustment_itemsUseCase,
    private readonly findStock_adjustment_itemsUseCase: FindStock_adjustment_itemsUseCase,
    protected readonly hardDeleteStock_adjustment_itemsUseCase: HardDeleteStock_adjustment_itemsUseCase,
    protected readonly softDeleteStock_adjustment_itemsUseCase: SoftDeleteStock_adjustment_itemsUseCase,
    protected readonly restoreStock_adjustment_itemsUseCase: RestoreStock_adjustment_itemsUseCase,
  ) {
    super({
      mapper: Stock_adjustment_itemsMapper,
      findOne: findOneStock_adjustment_itemsUseCase,
      hardDelete: hardDeleteStock_adjustment_itemsUseCase,
      softDelete: softDeleteStock_adjustment_itemsUseCase,
      restore: restoreStock_adjustment_itemsUseCase,
    });
  }

  @Post('')
  async create(@Body() body: CreateStock_adjustment_itemsDto): Promise<Stock_adjustment_itemsResponse> {
    return Stock_adjustment_itemsMapper.toResponse(await this.createStock_adjustment_itemsUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Stock_adjustment_itemsResponse>> {
    return Stock_adjustment_itemsMapper.toResponseList(await this.findStock_adjustment_itemsUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateStock_adjustment_itemsDto,
  ): Promise<Stock_adjustment_itemsResponse> {
    return Stock_adjustment_itemsMapper.toResponse(await this.updateStock_adjustment_itemsUseCase.execute(id, dto));
  }
}
  
  
  