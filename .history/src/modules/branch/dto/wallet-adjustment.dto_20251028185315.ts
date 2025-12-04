import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsPositive, 
  IsDateString 
} from 'class-validator';
import { AdjustmentType, AdjustmentReason, AdjustmentStatus } from '../domain/wallet-adjustment.entity';

export class CreateWalletAdjustmentDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  branch_id: number;

  @IsEnum(AdjustmentType)
  @IsNotEmpty()
  adjustment_type: AdjustmentType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsEnum(AdjustmentReason)
  @IsNotEmpty()
  reason: AdjustmentReason;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  @IsDateString()
  @IsOptional()
  adjustment_date?: string;
}

export class ApproveAdjustmentDto {
  @IsNumber()
  @IsNotEmpty()
  approved_by: number;

  @IsString()
  @IsOptional()
  notes?: string;
}