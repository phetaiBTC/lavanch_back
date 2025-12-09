import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  Min,
  IsEnum,
} from 'class-validator';
import { AdjustmentReasonEnum } from './create-wallet-adjustment.dto';

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

  @IsOptional()
  @IsEnum(AdjustmentReasonEnum)
  reason: AdjustmentReasonEnum | AdjustmentReasonEnum.TRANSFER;
}
