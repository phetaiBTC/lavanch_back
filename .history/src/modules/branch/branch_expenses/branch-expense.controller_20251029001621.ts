import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBranchExpenseDto } from './dto/create-branch-expense.dto';
import { ApproveExpenseDto } from './dto/approve-expense.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateBranchExpenseUseCase } from './application/commands/create-branch-expense.usecase';
import { ApproveExpenseUseCase } from './application/commands/approve-expense.usecase';
import { FindOneBranchExpenseUseCase } from './application/queries/findOne-branch-expense.usecase';
import { FindAllBranchExpenseUseCase } from './application/queries/find-branch-expense.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchExpenseMapper } from './infrastructure/branch-expense.mapper';
import { BranchExpenseResponse } from './interface/branch-expense.interface';

@Controller('branch-expenses')
export class BranchExpenseController {
  constructor(
    private readonly createBranchExpenseUseCase: CreateBranchExpenseUseCase,
    private readonly approveExpenseUseCase: ApproveExpenseUseCase,
    private readonly findOneBranchExpenseUseCase: FindOneBranchExpenseUseCase,
    private readonly findAllBranchExpenseUseCase: FindAllBranchExpenseUseCase,
  ) {}

  /**
   * Create a new expense (status: PENDING)
   * Does not affect wallet balance until approved
   */
  @Post()
  async create(@Body() dto: CreateBranchExpenseDto): Promise<BranchExpenseResponse> {
    return BranchExpenseMapper.toResponse(
      await this.createBranchExpenseUseCase.execute(dto),
    );
  }

  /**
   * Get all expenses
   */
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<BranchExpenseResponse>> {
    return BranchExpenseMapper.toResponseList(
      await this.findAllBranchExpenseUseCase.execute(query),
    );
  }

  /**
   * Get single expense by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BranchExpenseResponse> {
    return BranchExpenseMapper.toResponse(
      await this.findOneBranchExpenseUseCase.execute(id),
    );
  }

  /**
   * Approve or reject an expense
   * When approved: Creates wallet transaction and deducts from branch balance
   * When rejected: Just updates status
   */
  @Patch(':id/approve')
  async approve(
    @Param('id') id: number,
    @Body() dto: ApproveExpenseDto,
  ): Promise<BranchExpenseResponse> {
    return BranchExpenseMapper.toResponse(
      await this.approveExpenseUseCase.execute(+id, dto),
    );
  }
}
