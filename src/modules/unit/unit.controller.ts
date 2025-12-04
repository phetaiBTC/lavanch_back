import { Controller, Patch, Param, Body, Post, Get, Query } from '@nestjs/common';
import { Unit } from './domain/unit.entity';
import { UnitOrm } from 'src/database/typeorm/unit.orm-entity';
import { UnitResponse } from './interface/unit.interface';
import { CreateUnitDto } from './dto/create-Unit.dto';
import { UpdateUnitDto } from './dto/update-Unit.dto';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { UnitMapper } from './infrastructure/unit.mapper';
import { CreateUnitUseCase } from './application/commands/create-Unit.usecase';
import { UpdateUnitUseCase } from './application/commands/update-Unit.usecase';
import { FindOneUnitUseCase } from './application/queries/findOne-Unit.usecase';
import { FindAllUnitUseCase } from './application/queries/find-Unit.usecase';
import { HardDeleteUnitUseCase } from './application/commands/hard-Unit.usecase';
import { SoftDeleteUnitUseCase } from './application/commands/soft-Unit.usecase';
import { RestoreUnitUseCase } from './application/commands/restore-Unit.usecase';
import { ActiveUnitUseCase } from './application/commands/active-Unit.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { BaseControllerSetup } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('unit')
export class UnitController extends BaseControllerSetup<
  Unit,
  UnitOrm,
  UnitResponse,
  CreateUnitDto,
  UpdateUnitDto
> {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly findAllUnitUseCase: FindAllUnitUseCase,
    private readonly updateActiveUnitUseCase: ActiveUnitUseCase,
    protected readonly findOneUnitUseCase: FindOneUnitUseCase,
    protected readonly hardDeleteUnitUseCase: HardDeleteUnitUseCase,
    protected readonly softDeleteUnitUseCase: SoftDeleteUnitUseCase,
    protected readonly restoreUnitUseCase: RestoreUnitUseCase,
  ) {
    super({
      mapper: UnitMapper,
      findOne: findOneUnitUseCase,
      hardDelete: hardDeleteUnitUseCase,
      softDelete: softDeleteUnitUseCase,
      restore: restoreUnitUseCase,
    });
  }
  @Post('')
  async create(@Body() dto: CreateUnitDto): Promise<UnitResponse> {
    return UnitMapper.toResponse(await this.createUnitUseCase.execute(dto));
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUnitDto,
  ): Promise<UnitResponse> {
    return UnitMapper.toResponse(await this.updateUnitUseCase.execute(id, dto));
  }
  @Get('')
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<UnitResponse>> {
    return UnitMapper.toResponseList(
      await this.findAllUnitUseCase.execute(query),
    );
  }
  // custom endpoint only for Unit
  @Patch('active-update/:id')
  async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<UnitResponse> {
    return UnitMapper.toResponse(
      await this.updateActiveUnitUseCase.execute(id, dto),
    );
  }
}
