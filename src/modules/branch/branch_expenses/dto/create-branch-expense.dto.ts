import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateBranchExpenseDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  @IsNumber()
  expense_category_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsNumber()
  currency_id?: number;

  @IsNotEmpty()
  @IsDateString()
  expense_date: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  receipt_image?: string;
}
