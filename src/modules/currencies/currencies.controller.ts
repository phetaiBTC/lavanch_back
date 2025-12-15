import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCurrenciesDto } from './dto/create-Currencies.dto';
import { UpdateCurrenciesDto } from './dto/update-Currencies.dto';
import { CreateCurrenciesUseCase } from './application/commands/create-Currencies.usecase';
import { HardDeleteCurrenciesUseCase } from './application/commands/hard-Currencies.usecase';
import { SoftDeleteCurrenciesUseCase } from './application/commands/soft-Currencies.usecase';
import { RestoreCurrenciesUseCase } from './application/commands/restore-Currencies.usecase';
import { FindOneCurrenciesUseCase } from './application/queries/findOne-Currencies.usecase';
import { FindAllCurrenciesUseCase } from './application/queries/find-Currencies.usecase';
import { CurrenciesMapper } from './infrastructure/currencies.mapper';
import { CurrenciesResponse } from './interface/currencies.interface';
import { UpdateCurrenciesUseCase } from './application/commands/update-Currencies.usecase';
import { Currencies } from './domain/currencies.entity';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
@Controller('currencies')
export class CurrenciesController extends BaseController<
  Currencies,
  CurrenciesOrm,
  CurrenciesResponse,
  CreateCurrenciesDto,
  UpdateCurrenciesDto
> {
  constructor(
    private readonly createCurrenciesUseCase: CreateCurrenciesUseCase,
    private readonly updateCurrenciesUseCase: UpdateCurrenciesUseCase,
    private readonly findAllCurrenciesUseCase: FindAllCurrenciesUseCase,
    protected readonly hardDeleteCurrenciesUseCase: HardDeleteCurrenciesUseCase,
    protected readonly softDeleteCurrenciesUseCase: SoftDeleteCurrenciesUseCase,
    protected readonly restoreCurrenciesUseCase: RestoreCurrenciesUseCase,
    protected readonly findOneCurrenciesUseCase: FindOneCurrenciesUseCase,
  ) {
    super({
      mapper: CurrenciesMapper,
      hardDelete: hardDeleteCurrenciesUseCase,
      softDelete: softDeleteCurrenciesUseCase,
      restore: restoreCurrenciesUseCase,
      findOne: findOneCurrenciesUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreateCurrenciesDto,
  ): Promise<CurrenciesResponse> {
    return CurrenciesMapper.toResponse(
      await this.createCurrenciesUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateCurrenciesDto,
  ): Promise<CurrenciesResponse> {
    return CurrenciesMapper.toResponse(
      await this.updateCurrenciesUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<CurrenciesResponse>> {
    return CurrenciesMapper.toResponseList(
      await this.findAllCurrenciesUseCase.execute(query),
    );
  }
}
