import { IsNumber, IsEnum, IsOptional, IsString, Min } from 'class-validator';

export class CreateMemberTransactionDto {
  @IsNumber()
  member_id: number;

  @IsNumber()
  branch_id: number;

  @IsOptional()
  @IsNumber()
  sale_id?: number;

  @IsEnum(['EARN', 'REDEEM', 'REFUND', 'ADJUSTMENT'])
  type: string;

  @IsNumber()
  @Min(0)
  total_amount: number;

  @IsNumber()
  @Min(0)
  points_earned: number;

  @IsNumber()
  @Min(0)
  points_redeemed: number;

  @IsNumber()
  points_balance: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
