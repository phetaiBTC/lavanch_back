import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { DeleteMultipleExpenseCategoriesDto } from './dto/delete-multiple-expense-categories.dto';
import { FindExpenseCategoryDto } from './dto/find-expense-category.dto';
import { CreateExpenseCategoryUseCase } from './application/commands/create-expense-category.usecase';
import { HardDeleteExpenseCategoryUseCase } from './application/commands/hard-expense-category.usecase';
import { SoftDeleteExpenseCategoryUseCase } from './application/commands/soft-expense-category.usecase';
import { RestoreExpenseCategoryUseCase } from './application/commands/restore-expense-category.usecase';
import { ToggleExpenseCategoryStatusUseCase } from './application/commands/toggle-expense-category-status.usecase';
import { DeleteMultipleExpenseCategoriesUseCase } from './application/commands/delete-multiple-expense-categories.usecase';
import { FindOneExpenseCategoryUseCase } from './application/queries/findOne-expense-category.usecase';
import { FindAllExpenseCategoryUseCase } from './application/queries/find-expense-category.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ExpenseCategoryMapper } from './infrastructure/expense-category.mapper';
import { ExpenseCategoryResponse } from './interface/expense-category.interface';
import { UpdateExpenseCategoryUseCase } from './application/commands/update-expense-category.usecase';

@Controller('expense-categories')
export class ExpenseCategoryController {
  constructor(
    private readonly createExpenseCategoryUseCase: CreateExpenseCategoryUseCase,
    private readonly updateExpenseCategoryUseCase: UpdateExpenseCategoryUseCase,
    private readonly hardDeleteExpenseCategoryUseCase: HardDeleteExpenseCategoryUseCase,
    private readonly softDeleteExpenseCategoryUseCase: SoftDeleteExpenseCategoryUseCase,
    private readonly restoreExpenseCategoryUseCase: RestoreExpenseCategoryUseCase,
    private readonly toggleExpenseCategoryStatusUseCase: ToggleExpenseCategoryStatusUseCase,
    private readonly deleteMultipleExpenseCategoriesUseCase: DeleteMultipleExpenseCategoriesUseCase,
    private readonly findOneExpenseCategoryUseCase: FindOneExpenseCategoryUseCase,
    private readonly findAllExpenseCategoryUseCase: FindAllExpenseCategoryUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateExpenseCategoryDto,
  ): Promise<ExpenseCategoryResponse> {
    return ExpenseCategoryMapper.toResponse(
      await this.createExpenseCategoryUseCase.execute(dto),
    );
  }

  @Get()
  async findAll(
    @Query() query: FindExpenseCategoryDto,
  ): Promise<PaginatedResponse<ExpenseCategoryResponse>> {
    return ExpenseCategoryMapper.toResponseList(
      await this.findAllExpenseCategoryUseCase.execute(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ExpenseCategoryResponse> {
    return ExpenseCategoryMapper.toResponse(
      await this.findOneExpenseCategoryUseCase.execute(id),
    );
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return await this.restoreExpenseCategoryUseCase.execute(+id);
  }

  @Patch(':id/status')
  async toggleStatus(@Param('id') id: number) {
    return await this.toggleExpenseCategoryStatusUseCase.execute(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateExpenseCategoryDto,
  ): Promise<ExpenseCategoryResponse> {
    return ExpenseCategoryMapper.toResponse(
      await this.updateExpenseCategoryUseCase.execute(id, dto),
    );
  }

  @Delete('soft/:id')
  async softDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.softDeleteExpenseCategoryUseCase.execute(+id);
  }

  @Delete('multiple')
  async deleteMultiple(@Body() dto: DeleteMultipleExpenseCategoriesDto) {
    return await this.deleteMultipleExpenseCategoriesUseCase.execute(dto);
  }

  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteExpenseCategoryUseCase.execute(+id);
  }
}
