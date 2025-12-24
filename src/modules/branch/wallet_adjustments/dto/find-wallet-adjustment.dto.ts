import { IsOptional, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export enum AdjustmentTypeFilterEnum {
  ADD = 'ADD',
  DEDUCT = 'DEDUCT',
}

export enum AdjustmentStatusFilterEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class FindWalletAdjustmentDto extends PaginationDto {
  @IsOptional()
  @IsEnum(AdjustmentTypeFilterEnum)
  adjustment_type?: AdjustmentTypeFilterEnum;

  @IsOptional()
  @IsEnum(AdjustmentStatusFilterEnum)
  adjustment_status?: AdjustmentStatusFilterEnum;
}
