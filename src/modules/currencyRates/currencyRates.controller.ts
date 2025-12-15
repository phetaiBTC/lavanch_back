import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCurrencyRatesDto } from './dto/create-CurrencyRates.dto';
import { UpdateCurrencyRatesDto } from './dto/update-CurrencyRates.dto';
import { CreateCurrencyRatesUseCase } from './application/commands/create-CurrencyRates.usecase';
import { UpdateCurrencyRatesUseCase } from './application/commands/update-CurrencyRates.usecase';
import { HardDeleteCurrencyRatesUseCase } from './application/commands/hard-CurrencyRates.usecase';
import { SoftDeleteCurrencyRatesUseCase } from './application/commands/soft-CurrencyRates.usecase';
import { RestoreCurrencyRatesUseCase } from './application/commands/restore-CurrencyRates.usecase';
import { FindOneCurrencyRatesUseCase } from './application/queries/findOne-CurrencyRates.usecase';
import { FindAllCurrencyRatesUseCase } from './application/queries/find-CurrencyRates.usecase';
import { CurrencyRatesMapper } from './infrastructure/currencyrates.mapper';
import { CurrencyRatesResponse } from './interface/currencyrates.interface';
import { CurrencyRatesOrm } from 'src/database/typeorm/currencyRates.orm-entity';
import { CurrencyRates } from './domain/currencyrates.entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('currencyrates')
export class CurrencyRatesController extends BaseController<
  CurrencyRates,
  CurrencyRatesOrm,
  CurrencyRatesResponse,
  CreateCurrencyRatesDto,
  UpdateCurrencyRatesDto
> {
  constructor(
    protected readonly createCurrencyRatesUseCase: CreateCurrencyRatesUseCase,
    protected readonly updateCurrencyRatesUseCase: UpdateCurrencyRatesUseCase,
    protected readonly hardDeleteCurrencyRatesUseCase: HardDeleteCurrencyRatesUseCase,
    protected readonly softDeleteCurrencyRatesUseCase: SoftDeleteCurrencyRatesUseCase,
    protected readonly restoreCurrencyRatesUseCase: RestoreCurrencyRatesUseCase,
    protected readonly findOneCurrencyRatesUseCase: FindOneCurrencyRatesUseCase,
    protected readonly findAllCurrencyRatesUseCase: FindAllCurrencyRatesUseCase,
  ) {
    super({
      mapper: CurrencyRatesMapper,
      hardDelete: hardDeleteCurrencyRatesUseCase,
      softDelete: softDeleteCurrencyRatesUseCase,
      restore: restoreCurrencyRatesUseCase,
      findOne: findOneCurrencyRatesUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreateCurrencyRatesDto,
  ): Promise<CurrencyRatesResponse> {
    return CurrencyRatesMapper.toResponse(
      await this.createCurrencyRatesUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateCurrencyRatesDto,
  ): Promise<CurrencyRatesResponse> {
    return CurrencyRatesMapper.toResponse(
      await this.updateCurrencyRatesUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<CurrencyRatesResponse>> {
    return CurrencyRatesMapper.toResponseList(
      await this.findAllCurrencyRatesUseCase.execute(query),
    );
  }
}
