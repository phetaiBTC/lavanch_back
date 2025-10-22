import { Controller } from '@nestjs/common';
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
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { Currencies } from './domain/currencies.entity';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
@Controller('currencies')
export class CurrenciesController extends BaseController<
  Currencies,
  CurrenciesOrm,
  CurrenciesResponse,
  CreateCurrenciesDto,
  UpdateCurrenciesDto
> {
  constructor(
    protected readonly createCurrenciesUseCase: CreateCurrenciesUseCase,
    protected readonly updateCurrenciesUseCase: UpdateCurrenciesUseCase,
    protected readonly hardDeleteCurrenciesUseCase: HardDeleteCurrenciesUseCase,
    protected readonly softDeleteCurrenciesUseCase: SoftDeleteCurrenciesUseCase,
    protected readonly restoreCurrenciesUseCase: RestoreCurrenciesUseCase,
    protected readonly findOneCurrenciesUseCase: FindOneCurrenciesUseCase,
    protected readonly findAllCurrenciesUseCase: FindAllCurrenciesUseCase,
  ) {
    super(
      CurrenciesMapper,
      createCurrenciesUseCase,
      updateCurrenciesUseCase,
      findOneCurrenciesUseCase,
      findAllCurrenciesUseCase,
      hardDeleteCurrenciesUseCase,
      softDeleteCurrenciesUseCase,
      restoreCurrenciesUseCase,
    );
  }
  // @Post() async create(
  //   @Body() dto: CreateCurrenciesDto,
  // ): Promise<CurrenciesResponse> {
  //   return CurrenciesMapper.toResponse(
  //     await this.createCurrenciesUseCase.execute(dto),
  //   );
  // }
  // @Get() async findAll(
  //   @Query() query: PaginationDto,
  // ): Promise<PaginatedResponse<CurrenciesResponse>> {
  //   return CurrenciesMapper.toResponseList(
  //     await this.findAllCurrenciesUseCase.execute(query),
  //   );
  // }
  // @Get(':id') async findOne(
  //   @Param('id') id: number,
  // ): Promise<CurrenciesResponse> {
  //   return CurrenciesMapper.toResponse(
  //     await this.findOneCurrenciesUseCase.execute(id),
  //   );
  // }
  // @Patch(':id') async update(
  //   @Param('id') id: number,
  //   @Body() dto: UpdateCurrenciesDto,
  // ): Promise<CurrenciesResponse> {
  //   return CurrenciesMapper.toResponse(
  //     await this.updateCurrenciesUseCase.execute(id, dto),
  //   );
  // }
  // @Delete('soft/:id') async softDelete(
  //   @Param('id') id: number,
  // ): Promise<{ message: string }> {
  //   return await this.softDeleteCurrenciesUseCase.execute(+id);
  // }
  // @Delete('hard/:id') async hardDelete(
  //   @Param('id') id: number,
  // ): Promise<{ message: string }> {
  //   return await this.hardDeleteCurrenciesUseCase.execute(+id);
  // }
  // @Patch('restore/:id') async restore(
  //   @Param('id') id: number,
  // ): Promise<{ message: string }> {
  //   return await this.restoreCurrenciesUseCase.execute(+id);
  // }
}
