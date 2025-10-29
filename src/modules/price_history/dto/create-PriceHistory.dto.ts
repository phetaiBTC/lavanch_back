import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePriceHistoryDto {
  @IsNotEmpty()
  product_variant_id: number;

  @IsNotEmpty()
  unit_id: number;

  @IsOptional()
  @IsNumber()
  old_cost_price?: number;

  @IsOptional()
  @IsNumber()
  new_cost_price?: number;

  @IsOptional()
  @IsNumber()
  old_selling_price?: number;

  @IsOptional()
  @IsNumber()
  new_selling_price?: number;

  @IsNotEmpty()
  changed_by: number;

  @IsOptional()
  change_date?: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}
