import { Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { BaseMapper } from './infrastructure/base.mapper';
import {
  ICreateUseCase,
  IDeleteUseCase,
  IFindAllUseCase,
  IFindOneUseCase,
  IRestoreUseCase,
  IUpdateUseCase,
} from './application/base.usecase';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interface/pagination.interface';

export abstract class BaseControllerSetup<
  TDomain,
  TOrm,
  TResponse,
  TCreateDto,
  TUpdateDto,
> {
  constructor(
    protected readonly methods: {
      mapper: BaseMapper<TDomain, TOrm, TResponse>;
      findOne: IFindOneUseCase<TDomain>;
      hardDelete: IDeleteUseCase;
      softDelete: IDeleteUseCase;
      restore: IRestoreUseCase;
    },
  ) {}

  //   @Post()
  abstract create(dto: TCreateDto): Promise<TResponse>;

  abstract findAll(query: PaginationDto): Promise<PaginatedResponse<TResponse>>;

  abstract update(id: number, dto: TUpdateDto): Promise<TResponse>;

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TResponse> {
    return this.methods.mapper.toResponse(
      await this.methods.findOne.execute(id),
    );
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.methods.softDelete.execute(+id);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.methods.hardDelete.execute(+id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.methods.restore.execute(+id);
  }
}
