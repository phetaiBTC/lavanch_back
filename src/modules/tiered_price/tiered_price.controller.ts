import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTieredPriceDto } from './dto/create-TieredPrice.dto';
import { UpdateTieredPriceDto } from './dto/update-TieredPrice.dto';
import { CreateTieredPriceUseCase } from './application/commands/create-TieredPrice.usecase';
import { UpdateTieredPriceUseCase } from './application/commands/update-TieredPrice.usecase';
import { HardDeleteTieredPriceUseCase } from './application/commands/hard-TieredPrice.usecase';
import { SoftDeleteTieredPriceUseCase } from './application/commands/soft-TieredPrice.usecase';
import { RestoreTieredPriceUseCase } from './application/commands/restore-TieredPrice.usecase';
import { FindOneTieredPriceUseCase } from './application/queries/findOne-TieredPrice.usecase';
import { FindAllTieredPriceUseCase } from './application/queries/find-TieredPrice.usecase';
import { TieredPriceMapper } from './infrastructure/tiered_price.mapper';
import { TieredPriceResponse } from './interface/tiered_price.interface';
import { TieredPrice } from './domain/tiered_price.entity';
import { TieredPriceOrm } from 'src/database/typeorm/tiered-price.orm-entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Controller('tiered_price')
export class TieredPriceController extends BaseController<
  TieredPrice,
  TieredPriceOrm,
  TieredPriceResponse,
  CreateTieredPriceDto,
  UpdateTieredPriceDto
> {
  constructor(
    private readonly createTieredPriceUseCase: CreateTieredPriceUseCase,
    private readonly updateTieredPriceUseCase: UpdateTieredPriceUseCase,
    private readonly findAllTieredPriceUseCase: FindAllTieredPriceUseCase,
    protected readonly hardDeleteTieredPriceUseCase: HardDeleteTieredPriceUseCase,
    protected readonly softDeleteTieredPriceUseCase: SoftDeleteTieredPriceUseCase,
    protected readonly restoreTieredPriceUseCase: RestoreTieredPriceUseCase,
    protected readonly findOneTieredPriceUseCase: FindOneTieredPriceUseCase,
  ) {
    super({
      mapper: TieredPriceMapper,
      findOne: findOneTieredPriceUseCase,
      restore: restoreTieredPriceUseCase,
      hardDelete: hardDeleteTieredPriceUseCase,
      softDelete: softDeleteTieredPriceUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreateTieredPriceDto,
  ): Promise<TieredPriceResponse> {
    return TieredPriceMapper.toResponse(
      await this.createTieredPriceUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateTieredPriceDto,
  ): Promise<TieredPriceResponse> {
    return TieredPriceMapper.toResponse(
      await this.updateTieredPriceUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<TieredPriceResponse>> {
    return TieredPriceMapper.toResponseList(
      await this.findAllTieredPriceUseCase.execute(query),
    );
  }
}
