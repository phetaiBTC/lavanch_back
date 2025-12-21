import {
  Body,
  Controller,
  Param,
  Patch,
  Query,
  Post,
  Get,
} from '@nestjs/common';

import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Branch_stocks } from './domain/branch_stocks.entity';
import { Branch_stocksOrm } from 'src/database/typeorm/branch_stocks.orm-entity';
import { Branch_stocksResponse } from './interface/branch_stocks.interface';
import { Branch_stocksMapper } from './infrastructure/branch_stocks.mapper';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { CreateBranch_stocksDto } from './dto/create-branch_stocks.dto';
import { UpdateBranch_stocksDto } from './dto/update-branch_stocks.dto';
import { CreateBranch_stocksUseCase } from './application/commands/create-branch_stocks.usecase';
import { UpdateBranch_stocksUseCase } from './application/commands/update-branch_stocks.usecase';
import { FindOneBranch_stocksUseCase } from './application/queries/findOne-branch_stocks.usecase';
import { FindBranch_stocksUseCase } from './application/queries/findAll-branch_stocks.usecase';
import { HardDeleteBranch_stocksUseCase } from './application/commands/hard-branch_stocks.usecase';
import { SoftDeleteBranch_stocksUseCase } from './application/commands/soft-branch_stocks.usecase';
import { RestoreBranch_stocksUseCase } from './application/commands/restore-branch_stocks.usecase';

@Controller('branch_stocks')
export class Branch_stocksController extends BaseController<
  Branch_stocks,
  Branch_stocksOrm,
  Branch_stocksResponse,
  CreateBranch_stocksDto,
  UpdateBranch_stocksDto
> {
  constructor(
    private readonly createBranch_stocksUseCase: CreateBranch_stocksUseCase,
    private readonly updateBranch_stocksUseCase: UpdateBranch_stocksUseCase,
    protected readonly getOneBranch_stocksUseCase: FindOneBranch_stocksUseCase,
    private readonly getBranch_stocksUseCase: FindBranch_stocksUseCase,
    protected readonly hardDeleteBranch_stocksUseCase: HardDeleteBranch_stocksUseCase,
    protected readonly softDeleteBranch_stocksUseCase: SoftDeleteBranch_stocksUseCase,
    protected readonly restoreBranch_stocksUseCase: RestoreBranch_stocksUseCase,
  ) {
    super({
      mapper: Branch_stocksMapper,
      findOne: getOneBranch_stocksUseCase,
      hardDelete: hardDeleteBranch_stocksUseCase,
      softDelete: softDeleteBranch_stocksUseCase,
      restore: restoreBranch_stocksUseCase,
    });
  }

  @Post('')
  async create(
    @Body() body: CreateBranch_stocksDto,
  ): Promise<Branch_stocksResponse> {
    return Branch_stocksMapper.toResponse(
      await this.createBranch_stocksUseCase.execute(body),
    );
  }

  @Get('')
  async findAll(
    @Query()
    query: PaginationDto,
  ): Promise<PaginatedResponse<Branch_stocksResponse>> {
    return Branch_stocksMapper.toResponseList(
      await this.getBranch_stocksUseCase.execute(query),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBranch_stocksDto,
  ): Promise<Branch_stocksResponse> {
    return Branch_stocksMapper.toResponse(
      await this.updateBranch_stocksUseCase.execute(id, dto),
    );
  }
}
