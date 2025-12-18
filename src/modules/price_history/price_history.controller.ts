import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { CreatePriceHistoryDto } from './dto/create-PriceHistory.dto';
import { UpdatePriceHistoryDto } from './dto/update-PriceHistory.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreatePriceHistoryUseCase } from './application/commands/create-PriceHistory.usecase';
import { UpdatePriceHistoryUseCase } from './application/commands/update-PriceHistory.usecase';
import { HardDeletePriceHistoryUseCase } from './application/commands/hard-PriceHistory.usecase';
import { SoftDeletePriceHistoryUseCase } from './application/commands/soft-PriceHistory.usecase';
import { RestorePriceHistoryUseCase } from './application/commands/restore-PriceHistory.usecase';
import { FindOnePriceHistoryUseCase } from './application/queries/findOne-PriceHistory.usecase';
import { FindAllPriceHistoryUseCase } from './application/queries/find-PriceHistory.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { PriceHistoryMapper } from './infrastructure/price_history.mapper';
import { PriceHistoryResponse } from './interface/price_history.interface';
import { PriceHistory } from './domain/price_history.entity';
import { PriceHistoryOrm } from 'src/database/typeorm/price_history.orm-entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
@Controller('price_history')
export class PriceHistoryController extends BaseController<
  PriceHistory,
  PriceHistoryOrm,
  PriceHistoryResponse,
  CreatePriceHistoryDto,
  UpdatePriceHistoryDto
> {
  constructor(
    protected readonly createPriceHistoryUseCase: CreatePriceHistoryUseCase,
    protected readonly updatePriceHistoryUseCase: UpdatePriceHistoryUseCase,
    protected readonly hardDeletePriceHistoryUseCase: HardDeletePriceHistoryUseCase,
    protected readonly softDeletePriceHistoryUseCase: SoftDeletePriceHistoryUseCase,
    protected readonly restorePriceHistoryUseCase: RestorePriceHistoryUseCase,
    protected readonly findOnePriceHistoryUseCase: FindOnePriceHistoryUseCase,
    protected readonly findAllPriceHistoryUseCase: FindAllPriceHistoryUseCase,
  ) {
    super({
      mapper: PriceHistoryMapper,
      hardDelete: hardDeletePriceHistoryUseCase,
      softDelete: softDeletePriceHistoryUseCase,
      restore: restorePriceHistoryUseCase,
      findOne: findOnePriceHistoryUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreatePriceHistoryDto,
  ): Promise<PriceHistoryResponse> {
    return PriceHistoryMapper.toResponse(
      await this.createPriceHistoryUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdatePriceHistoryDto,
  ): Promise<PriceHistoryResponse> {
    return PriceHistoryMapper.toResponse(
      await this.updatePriceHistoryUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<PriceHistoryResponse>> {
    return PriceHistoryMapper.toResponseList(
      await this.findAllPriceHistoryUseCase.execute(query),
    );
  }
}
