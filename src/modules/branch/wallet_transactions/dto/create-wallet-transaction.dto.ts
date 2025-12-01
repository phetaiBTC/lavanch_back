import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';

export enum TransactionTypeEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  SALE = 'SALE',
  EXPENSE = 'EXPENSE',
  REFUND = 'REFUND',
}

export class CreateWalletTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  transaction_type: TransactionTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  reference_type?: string;

  @IsOptional()
  @IsNumber()
  reference_id?: number;

  @IsOptional()
  @IsString()
  reference_no?: string;

  @IsOptional()
  @IsNumber()
  related_branch_id?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsNumber()
  created_by: number;

  @IsOptional()
  @IsNumber()
  approved_by?: number;
}
