
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { BaseMapper } from '../mappers/base.mapper';
import { ICreateUseCase, IDeleteUseCase, IFindAllUseCase, IFindOneUseCase, IRestoreUseCase, IUpdateUseCase } from '../Base Use Cases Interfaces/Base.usecase';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interface/pagination.interface';

export abstract class BaseController<
  TDomain,
  TOrm,
  TResponse,
  TCreateDto,
  TUpdateDto,
> {
  constructor(
    protected readonly mapper: BaseMapper<TDomain, TOrm, TResponse>,
    protected readonly createUseCase: ICreateUseCase<TCreateDto, TDomain>,
    protected readonly updateUseCase: IUpdateUseCase<TUpdateDto, TDomain>,
    protected readonly findOneUseCase: IFindOneUseCase<TDomain>,
    protected readonly findAllUseCase: IFindAllUseCase<TDomain>,
    protected readonly hardDeleteUseCase: IDeleteUseCase,
    protected readonly softDeleteUseCase: IDeleteUseCase,
    protected readonly restoreUseCase: IRestoreUseCase,
  ) {}

  @Post()
  async create(@Body() dto: TCreateDto): Promise<TResponse> {
    return this.mapper.toResponse(await this.createUseCase.execute(dto));
  }

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<TResponse>> {
    return this.mapper.toResponseList(await this.findAllUseCase.execute(query));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TResponse> {
    return this.mapper.toResponse(await this.findOneUseCase.execute(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: TUpdateDto,
  ): Promise<TResponse> {
    return this.mapper.toResponse(await this.updateUseCase.execute(id, dto));
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteUseCase.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteUseCase.execute(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreUseCase.execute(+id);
  }
}