import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsPositive, 
  IsDateString 
} from 'class-validator';
import { TransactionType, TransactionStatus } from '../domain/wallet-transaction.entity';

export class CreateWalletTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  branch_id: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  transaction_type: TransactionType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsString()
  @IsOptional()
  reference_type?: string;

  @IsNumber()
  @IsOptional()
  reference_id?: number;

  @IsString()
  @IsOptional()
  reference_no?: string;

  @IsNumber()
  @IsOptional()
  related_branch_id?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  @IsNumber()
  @IsOptional()
  approved_by?: number;

  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @IsDateString()
  @IsOptional()
  transaction_date?: Date;
}

export class WalletTransactionQueryDto {
  @IsNumber()
  @IsOptional()
  branch_id?: number;

  @IsEnum(TransactionType)
  @IsOptional()
  transaction_type?: TransactionType;

  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @IsDateString()
  @IsOptional()
  start_date?: Date;

  @IsDateString()
  @IsOptional()
  end_date?: Date;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class TransferDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  from_branch_id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  to_branch_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;
}