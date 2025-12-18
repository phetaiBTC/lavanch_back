import { Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { BaseMapper } from './infrastructure/base.mapper';
import {
  IDeleteUseCase,
  IFindOneUseCase,
  IRestoreUseCase,
  ICreateUseCase,
  IFindAllUseCase,
  IUpdateUseCase,
} from './application/base.usecase';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interface/pagination.interface';
import { IdArrayDto } from './dto/id.dto';
export abstract class BaseController<
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

  abstract create(dto: TCreateDto): Promise<TResponse>;

  abstract findAll(query: PaginationDto): Promise<PaginatedResponse<TResponse>>;

  abstract update(id: number, dto: TUpdateDto): Promise<TResponse>;

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TResponse> {
    return this.methods.mapper.toResponse(
      await this.methods.findOne.execute(id),
    );
  }

  @Delete('soft')
  async softDelete(@Body() body: IdArrayDto): Promise<{ message: string }> {
    return await this.methods.softDelete.execute(body.ids);
  }

  @Delete('hard')
  async hardDelete(@Body() body: IdArrayDto): Promise<{ message: string }> {
    return await this.methods.hardDelete.execute(body.ids);
  }

  @Patch('restore')
  async restore(@Body() body: IdArrayDto): Promise<{ message: string }> {
    return await this.methods.restore.execute(body.ids);
  }
}
