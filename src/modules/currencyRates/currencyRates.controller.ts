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
import { CreateCurrencyRatesDto } from './dto/create-CurrencyRates.dto';
import { UpdateCurrencyRatesDto } from './dto/update-CurrencyRates.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateCurrencyRatesUseCase } from './application/commands/create-CurrencyRates.usecase';
import { UpdateCurrencyRatesUseCase } from './application/commands/update-CurrencyRates.usecase';
import { HardDeleteCurrencyRatesUseCase } from './application/commands/hard-CurrencyRates.usecase';
import { SoftDeleteCurrencyRatesUseCase } from './application/commands/soft-CurrencyRates.usecase';
import { RestoreCurrencyRatesUseCase } from './application/commands/restore-CurrencyRates.usecase';
import { FindOneCurrencyRatesUseCase } from './application/queries/findOne-CurrencyRates.usecase';
import { FindAllCurrencyRatesUseCase } from './application/queries/find-CurrencyRates.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { CurrencyRatesMapper } from './infrastructure/currencyrates.mapper';
import { CurrencyRatesResponse } from './interface/currencyrates.interface';
@Controller('currencyrates')
export class CurrencyRatesController {
  constructor(
    private readonly createCurrencyRatesUseCase: CreateCurrencyRatesUseCase,
    private readonly updateCurrencyRatesUseCase: UpdateCurrencyRatesUseCase,
    private readonly hardDeleteCurrencyRatesUseCase: HardDeleteCurrencyRatesUseCase,
    private readonly softDeleteCurrencyRatesUseCase: SoftDeleteCurrencyRatesUseCase,
    private readonly restoreCurrencyRatesUseCase: RestoreCurrencyRatesUseCase,
    private readonly findOneCurrencyRatesUseCase: FindOneCurrencyRatesUseCase,
    private readonly findAllCurrencyRatesUseCase: FindAllCurrencyRatesUseCase,
  ) {}
  @Post() async create(
    @Body() dto: CreateCurrencyRatesDto,
  ): Promise<CurrencyRatesResponse> {
    return CurrencyRatesMapper.toResponse(
      await this.createCurrencyRatesUseCase.execute(dto),
    );
  }
  @Get() async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<CurrencyRatesResponse>> {
    return CurrencyRatesMapper.toResponseList(
      await this.findAllCurrencyRatesUseCase.execute(query),
    );
  }
  @Get(':id') async findOne(
    @Param('id') id: number,
  ): Promise<CurrencyRatesResponse> {
    return CurrencyRatesMapper.toResponse(
      await this.findOneCurrencyRatesUseCase.execute(id),
    );
  }
  @Patch(':id') async update(
    @Param('id') id: number,
    @Body() dto: UpdateCurrencyRatesDto,
  ): Promise<CurrencyRatesResponse> {
    return CurrencyRatesMapper.toResponse(
      await this.updateCurrencyRatesUseCase.execute(id, dto),
    );
  }
  @Delete('soft/:id') async softDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.softDeleteCurrencyRatesUseCase.execute(+id);
  }
  @Delete('hard/:id') async hardDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.hardDeleteCurrencyRatesUseCase.execute(+id);
  }
  @Patch('restore/:id') async restore(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.restoreCurrencyRatesUseCase.execute(+id);
  }
}
