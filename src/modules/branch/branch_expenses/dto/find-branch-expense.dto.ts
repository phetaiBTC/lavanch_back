import { IsOptional, IsEnum, IsString, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export enum ExpenseStatusFilter {
  ALL = 'ALL',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class FindBranchExpenseDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ExpenseStatusFilter)
  expenseStatus?: ExpenseStatusFilter;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  branchId?: number;

  @IsOptional()
  @IsString()
  branchName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  expenseCategoryId?: number;

  @IsOptional()
  @IsString()
  expenseCategoryName?: string;

  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  createdTo?: string;
}
