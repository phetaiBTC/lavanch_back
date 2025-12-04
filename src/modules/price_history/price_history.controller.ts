import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
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
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { PriceHistory } from './domain/price_history.entity';
import { PriceHistoryOrm } from 'src/database/typeorm/price_history.orm-entity';
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
    super(
      PriceHistoryMapper,
      createPriceHistoryUseCase,
      updatePriceHistoryUseCase,
      findOnePriceHistoryUseCase,
      findAllPriceHistoryUseCase,
      hardDeletePriceHistoryUseCase,
      softDeletePriceHistoryUseCase,
      restorePriceHistoryUseCase,
    );
  }
}
