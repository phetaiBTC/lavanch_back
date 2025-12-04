import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateWalletTransferDto {
  @IsNotEmpty()
  @IsNumber()
  branch_id: number; // Sender branch

  @IsNotEmpty()
  @IsNumber()
  receiver_branch_id: number; // Receiver branch

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