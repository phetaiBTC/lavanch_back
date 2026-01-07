import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StockMovementType } from 'src/database/typeorm/stock_movements.orm-entity';

export class CreateStockMovementDto {
  @IsNumber()
  @IsNotEmpty()
  branchId: number;
  @IsNumber()
  @IsNotEmpty()
  productVariantId: number;
  @IsNumber()
  @IsOptional()
  productLotId?: number;
  @IsNumber()
  @IsOptional()
  referenceId?: number;
  @IsString()
  @IsOptional()
  referenceTable?: string;
  @IsDate()
  @IsNotEmpty()
  movementDate: Date;
  @IsEnum(StockMovementType)
  @IsNotEmpty()
  movementType: StockMovementType;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
