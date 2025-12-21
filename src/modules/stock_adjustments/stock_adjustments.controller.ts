
  
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
import { Stock_adjustments } from './domain/stock_adjustments.entity';
import { Stock_adjustmentsOrm } from 'src/database/typeorm/stock_adjustments.orm-entity';
import { Stock_adjustmentsResponse } from './interface/stock_adjustments.interface';
import { CreateStock_adjustmentsDto } from './dto/create-stock_adjustments.dto';
import { UpdateStock_adjustmentsDto } from './dto/update-stock_adjustments.dto';
import { CreateStock_adjustmentsUseCase } from './application/commands/create-stock_adjustments.usecase';
import { UpdateStock_adjustmentsUseCase } from './application/commands/update-stock_adjustments.usecase';
import { FindOneStock_adjustmentsUseCase } from './application/queries/findOne-stock_adjustments.usecase';
import { FindStock_adjustmentsUseCase } from './application/queries/findAll-stock_adjustments.usecase';
import { Stock_adjustmentsMapper } from './infrastructure/stock_adjustments.mapper';
import { RestoreStock_adjustmentsUseCase } from './application/commands/restore-stock_adjustments.usecase';
import { SoftDeleteStock_adjustmentsUseCase } from './application/commands/soft-stock_adjustments.usecase';
import { HardDeleteStock_adjustmentsUseCase } from './application/commands/hard-stock_adjustments.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';

@Controller('stock_adjustments')
export class Stock_adjustmentsController extends BaseController<
  Stock_adjustments,
  Stock_adjustmentsOrm,
  Stock_adjustmentsResponse,
  CreateStock_adjustmentsDto,
  UpdateStock_adjustmentsDto
> {
  constructor(
    private readonly createStock_adjustmentsUseCase: CreateStock_adjustmentsUseCase,
    private readonly updateStock_adjustmentsUseCase: UpdateStock_adjustmentsUseCase,
    protected readonly findOneStock_adjustmentsUseCase: FindOneStock_adjustmentsUseCase,
    private readonly findStock_adjustmentsUseCase: FindStock_adjustmentsUseCase,
    protected readonly hardDeleteStock_adjustmentsUseCase: HardDeleteStock_adjustmentsUseCase,
    protected readonly softDeleteStock_adjustmentsUseCase: SoftDeleteStock_adjustmentsUseCase,
    protected readonly restoreStock_adjustmentsUseCase: RestoreStock_adjustmentsUseCase,
  ) {
    super({
      mapper: Stock_adjustmentsMapper,
      findOne: findOneStock_adjustmentsUseCase,
      hardDelete: hardDeleteStock_adjustmentsUseCase,
      softDelete: softDeleteStock_adjustmentsUseCase,
      restore: restoreStock_adjustmentsUseCase,
    });
  }

  @Post('')
  async create(@Body() body: CreateStock_adjustmentsDto): Promise<Stock_adjustmentsResponse> {
    return Stock_adjustmentsMapper.toResponse(await this.createStock_adjustmentsUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Stock_adjustmentsResponse>> {
    return Stock_adjustmentsMapper.toResponseList(await this.findStock_adjustmentsUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateStock_adjustmentsDto,
  ): Promise<Stock_adjustmentsResponse> {
    return Stock_adjustmentsMapper.toResponse(await this.updateStock_adjustmentsUseCase.execute(id, dto));
  }
}
  
  
  