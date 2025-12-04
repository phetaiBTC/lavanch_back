import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsPositive, 
  IsDateString 
} from 'class-validator';
import { ExpenseStatus } from 'src/database/typeorm/branch_expenses.orm-entity';

export class CreateBranchExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  branch_id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  expense_category_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsOptional()
  currency_id?: number;

  @IsDateString()
  @IsNotEmpty()
  expense_date: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  receipt_image?: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;
}

export class ApproveExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  approved_by: number;

  @IsString()
  @IsOptional()
  notes?: string;
}