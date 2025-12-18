import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Point } from './domain/point.entity';
import { PointOrm } from 'src/database/typeorm/point.orm-entity';
import { PointResponse } from './interface/point.interface';
import { CreatePointDto } from './dto/create-Point.dto';
import { UpdatePointDto } from './dto/update-Point.dto';
import { PointMapper } from './infrastructure/point.mapper';
import { CreatePointUseCase } from './application/commands/create-Point.usecase';
import { UpdatePointUseCase } from './application/commands/update-Point.usecase';
import { FindOnePointUseCase } from './application/queries/findOne-Point.usecase';
import { FindAllPointUseCase } from './application/queries/find-Point.usecase';
import { HardDeletePointUseCase } from './application/commands/hard-Point.usecase';
import { SoftDeletePointUseCase } from './application/commands/soft-Point.usecase';
import { RestorePointUseCase } from './application/commands/restore-Point.usecase';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('point')
export class PointController extends BaseController<
  Point,
  PointOrm,
  PointResponse,
  CreatePointDto,
  UpdatePointDto
> {
  constructor(
    private readonly createPointUseCase: CreatePointUseCase,
    private readonly updatePointUseCase: UpdatePointUseCase,
    private readonly findAllPointUseCase: FindAllPointUseCase,
    protected readonly findOnePointUseCase: FindOnePointUseCase,
    protected readonly hardDeletePointUseCase: HardDeletePointUseCase,
    protected readonly softDeletePointUseCase: SoftDeletePointUseCase,
    protected readonly restorePointUseCase: RestorePointUseCase,
  ) {
    super({
      findOne: findOnePointUseCase,
      hardDelete: hardDeletePointUseCase,
      softDelete: softDeletePointUseCase,
      restore: restorePointUseCase,
      mapper: PointMapper,
    });
  }
  @Post()
  override async create(@Body() dto: CreatePointDto): Promise<PointResponse> {
    return PointMapper.toResponse(await this.createPointUseCase.execute(dto));
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdatePointDto,
  ): Promise<PointResponse> {
    return PointMapper.toResponse(
      await this.updatePointUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<PointResponse>> {
    return PointMapper.toResponseList(
      await this.findAllPointUseCase.execute(query),
    );
  }
}
