import { Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { Suppliers } from './domain/suppliers.entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { SuppliersOrm } from 'src/database/typeorm/suppliers.orm-entity';
import { SuppliersResponse } from './interface/suppliers.interface';
import { CreateSuppliersDto } from './dto/create-Suppliers.dto';
import { UpdateSuppliersDto } from './dto/update-Suppliers.dto';
import { CreateSuppliersUseCase } from './application/commands/create-Suppliers.usecase';
import { UpdateSuppliersUseCase } from './application/commands/update-Suppliers.usecase';
import { FindOneSuppliersUseCase } from './application/queries/findOne-Suppliers.usecase';
import { FindAllSuppliersUseCase } from './application/queries/find-Suppliers.usecase';
import { HardDeleteSuppliersUseCase } from './application/commands/hard-Suppliers.usecase';
import { SoftDeleteSuppliersUseCase } from './application/commands/soft-Suppliers.usecase';
import { RestoreSuppliersUseCase } from './application/commands/restore-Suppliers.usecase';
import { SuppliersMapper } from './infrastructure/suppliers.mapper';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('suppliers')
export class SuppliersController extends BaseController<
  Suppliers,
  SuppliersOrm,
  SuppliersResponse,
  CreateSuppliersDto,
  UpdateSuppliersDto
> {
  constructor(
    private readonly createsuppliersUseCase: CreateSuppliersUseCase,
    private readonly updatesuppliersUseCase: UpdateSuppliersUseCase,
    private readonly findAllsuppliersUseCase: FindAllSuppliersUseCase,
    protected readonly findOnesuppliersUseCase: FindOneSuppliersUseCase,
    protected readonly hardDeletesuppliersUseCase: HardDeleteSuppliersUseCase,
    protected readonly softDeletesuppliersUseCase: SoftDeleteSuppliersUseCase,
    protected readonly restoresuppliersUseCase: RestoreSuppliersUseCase,
  ) {
    super({
      mapper: SuppliersMapper,
      findOne: findOnesuppliersUseCase,
      softDelete: softDeletesuppliersUseCase,
      hardDelete: hardDeletesuppliersUseCase,
      restore: restoresuppliersUseCase,
    });
  }
  @Post()
  override async create(data: CreateSuppliersDto): Promise<SuppliersResponse> {
    return SuppliersMapper.toResponse(
      await this.createsuppliersUseCase.execute(data),
    );
  }

  @Patch(':id')
  override async update(
    id: number,
    data: UpdateSuppliersDto,
  ): Promise<SuppliersResponse> {
    return SuppliersMapper.toResponse(
      await this.updatesuppliersUseCase.execute(id, data),
    );
  }
  @Get('')
  override async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<SuppliersResponse>> {
    return SuppliersMapper.toResponseList(
      await this.findAllsuppliersUseCase.execute(query),
    );
  }
}
