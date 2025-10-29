import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class UpdateProductLotDto {
  @IsNotEmpty()
  product_variant_id: number;

  @IsNotEmpty()
  lot_number: string;

  @IsOptional()
  @IsDateString()
  manufacture_date?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsNotEmpty()
  branch_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  cost_price_local: number;

  @IsNotEmpty()
  cost_currency_id: number;

  @IsNotEmpty()
  @IsNumber()
  cost_price_original: number;

  @IsNotEmpty()
  @IsNumber()
  fx_rate: number;
}
