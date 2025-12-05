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
import { FindBranchExpenseDto } from './dto/find-branch-expense.dto';
import { CreateBranchExpenseUseCase } from './application/commands/create-branch-expense.usecase';
import { ApproveExpenseUseCase } from './application/commands/approve-expense.usecase';
import { FindOneBranchExpenseUseCase } from './application/queries/findOne-branch-expense.usecase';
import { FindAllBranchExpenseUseCase } from './application/queries/find-branch-expense.usecase';
import { GetBranchExpenseSummaryUseCase } from './application/queries/get-summary.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { BranchExpenseMapper } from './infrastructure/branch-expense.mapper';
import { BranchExpenseResponse } from './interface/branch-expense.interface';
import { JwtAuthGuard } from 'src/guards/AuthGuard';
import { CurrentUser } from 'src/shared/decorator/user.decorator';
import { SummaryResponse } from './domain/branch-expense.repository';
import { AuthPayload } from 'src/modules/auth/interface/auth.interface';

@Controller('branch-expenses')
@UseGuards(JwtAuthGuard)
export class BranchExpenseController {
  constructor(
    private readonly createBranchExpenseUseCase: CreateBranchExpenseUseCase,
    private readonly approveExpenseUseCase: ApproveExpenseUseCase,
    private readonly findOneBranchExpenseUseCase: FindOneBranchExpenseUseCase,
    private readonly findAllBranchExpenseUseCase: FindAllBranchExpenseUseCase,
    private readonly getSummaryUseCase: GetBranchExpenseSummaryUseCase,
  ) {}

  /**
   * Create a new expense (status: PENDING)
   * Does not affect wallet balance until approved
   */
  @Post()
  async create(
    @Body() dto: CreateBranchExpenseDto,
    @CurrentUser() user: AuthPayload,
  ): Promise<BranchExpenseResponse> {
    return BranchExpenseMapper.toResponse(
      await this.createBranchExpenseUseCase.execute(dto, user.id),
    );
  }

  /**
   * Get all expenses
   */
  @Get()
  async findAll(
    @Query() query: FindBranchExpenseDto,
  ): Promise<PaginatedResponse<BranchExpenseResponse>> {
    return BranchExpenseMapper.toResponseList(
      await this.findAllBranchExpenseUseCase.execute(query),
    );
  }

  /**
   * Get summary statistics (total amount, counts by status)
   */
  @Get('summary')
  async getSummary(
    @Query() query: FindBranchExpenseDto,
  ): Promise<SummaryResponse> {
    return this.getSummaryUseCase.execute(query);
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
    @CurrentUser() user: AuthPayload,
  ): Promise<BranchExpenseResponse> {
    return BranchExpenseMapper.toResponse(
      await this.approveExpenseUseCase.execute(+id, dto, user.id),
    );
  }

  /**
   * Reject an expense (convenience endpoint)
   */
  @Patch(':id/reject')
  async reject(
    @Param('id') id: number,
    @CurrentUser() user: any,
  ): Promise<BranchExpenseResponse> {
    return BranchExpenseMapper.toResponse(
      await this.approveExpenseUseCase.execute(
        +id,
        { action: 'REJECT' as any },
        user.id,
      ),
    );
  }
}
