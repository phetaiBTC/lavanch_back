import { IsOptional, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export enum TransactionTypeFilterEnum {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  SALE = 'SALE',
  EXPENSE = 'EXPENSE',
  REFUND = 'REFUND',
}

export enum TransactionStatusFilterEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class FindWalletTransactionDto extends PaginationDto {
  @IsOptional()
  branch_id?: number;

  @IsOptional()
  @IsEnum(TransactionTypeFilterEnum)
  transaction_type?: TransactionTypeFilterEnum;

  @IsOptional()
  @IsEnum(TransactionStatusFilterEnum)
  transaction_status?: TransactionStatusFilterEnum;

  @IsOptional()
  date_from?: string; // ISO date string

  @IsOptional()
  date_to?: string; // ISO date string
}
