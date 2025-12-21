
  
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
import { Stock_movements } from './domain/stock_movements.entity';
import { Stock_movementsOrm } from 'src/database/typeorm/stock_movements.orm-entity';
import { Stock_movementsResponse } from './interface/stock_movements.interface';
import { CreateStock_movementsDto } from './dto/create-stock_movements.dto';
import { UpdateStock_movementsDto } from './dto/update-stock_movements.dto';
import { CreateStock_movementsUseCase } from './application/commands/create-stock_movements.usecase';
import { UpdateStock_movementsUseCase } from './application/commands/update-stock_movements.usecase';
import { FindOneStock_movementsUseCase } from './application/queries/findOne-stock_movements.usecase';
import { FindStock_movementsUseCase } from './application/queries/findAll-stock_movements.usecase';
import { Stock_movementsMapper } from './infrastructure/stock_movements.mapper';
import { RestoreStock_movementsUseCase } from './application/commands/restore-stock_movements.usecase';
import { SoftDeleteStock_movementsUseCase } from './application/commands/soft-stock_movements.usecase';
import { HardDeleteStock_movementsUseCase } from './application/commands/hard-stock_movements.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';

@Controller('stock_movements')
export class Stock_movementsController extends BaseController<
  Stock_movements,
  Stock_movementsOrm,
  Stock_movementsResponse,
  CreateStock_movementsDto,
  UpdateStock_movementsDto
> {
  constructor(
    private readonly createStock_movementsUseCase: CreateStock_movementsUseCase,
    private readonly updateStock_movementsUseCase: UpdateStock_movementsUseCase,
    protected readonly findOneStock_movementsUseCase: FindOneStock_movementsUseCase,
    private readonly findStock_movementsUseCase: FindStock_movementsUseCase,
    protected readonly hardDeleteStock_movementsUseCase: HardDeleteStock_movementsUseCase,
    protected readonly softDeleteStock_movementsUseCase: SoftDeleteStock_movementsUseCase,
    protected readonly restoreStock_movementsUseCase: RestoreStock_movementsUseCase,
  ) {
    super({
      mapper: Stock_movementsMapper,
      findOne: findOneStock_movementsUseCase,
      hardDelete: hardDeleteStock_movementsUseCase,
      softDelete: softDeleteStock_movementsUseCase,
      restore: restoreStock_movementsUseCase,
    });
  }

  @Post('')
  async create(@Body() body: CreateStock_movementsDto): Promise<Stock_movementsResponse> {
    return Stock_movementsMapper.toResponse(await this.createStock_movementsUseCase.execute(body));
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Stock_movementsResponse>> {
    return Stock_movementsMapper.toResponseList(await this.findStock_movementsUseCase.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateStock_movementsDto,
  ): Promise<Stock_movementsResponse> {
    return Stock_movementsMapper.toResponse(await this.updateStock_movementsUseCase.execute(id, dto));
  }
}
  
  
  