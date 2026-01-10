import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

// create-stock-transfer.dto.ts
export class CreateStockTransferItemDto {
  @IsNumber()
  @IsNotEmpty()
  readonly productVariantId: number;

  @IsNumber()
  @IsOptional()
  readonly productLotId?: number;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}

export class CreateStockTransferDto {
  @IsNumber()
  @IsNotEmpty()
  readonly fromBranchId: number;
  @IsNumber()
  @IsNotEmpty()
  readonly toBranchId: number;

  @IsDate()
  @IsNotEmpty()
  readonly transfer_date: Date;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateStockTransferItemDto)
  readonly items: CreateStockTransferItemDto[];
}
