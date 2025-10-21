import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';

export enum AdjustmentTypeEnum {
  ADD = 'ADD',
  DEDUCT = 'DEDUCT',
}

export enum AdjustmentReasonEnum {
  CORRECTION = 'CORRECTION',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  LOST = 'LOST',
  FOUND = 'FOUND',
}

export class CreateWalletAdjustmentDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  @IsEnum(AdjustmentTypeEnum)
  adjustment_type: AdjustmentTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @IsEnum(AdjustmentReasonEnum)
  reason: AdjustmentReasonEnum;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  created_by: number;
}
