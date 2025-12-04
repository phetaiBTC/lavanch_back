import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateDepositAdjustmentDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateWithdrawAdjustmentDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  created_by: number;
}

export class CreateFoundAdjustmentDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  created_by: number;
}

export class CreateLostAdjustmentDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  created_by: number;
}