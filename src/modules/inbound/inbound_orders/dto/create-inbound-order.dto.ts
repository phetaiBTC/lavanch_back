import { Type } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDate,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

export class CreateInboundOrderItemDto {
  @IsInt()
  @IsNotEmpty()
  product_variant_id: number;

  @IsInt()
  @IsNotEmpty()
  unit_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  @IsInt()
  @IsOptional()
  product_lot_id?: number;
}

export class CreateInboundOrderDto {
  @IsInt()
  @IsNotEmpty()
  branch_id: number;

  @IsInt()
  @IsNotEmpty()
  supplier_id: number;

  @IsInt()
  @IsNotEmpty()
  currency_id: number;

  @IsDate()
  @IsNotEmpty()
  expected_date: Date;

  @IsDate()
  @IsNotEmpty()
  order_date: Date;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateInboundOrderItemDto)
  readonly items: CreateInboundOrderItemDto[];
}
