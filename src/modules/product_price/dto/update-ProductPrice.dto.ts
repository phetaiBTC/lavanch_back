import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductPriceDto {
  @IsNotEmpty()
  @IsNumber()
  readonly product_variant_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly unit_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly cost_price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly selling_price: number;

  @IsOptional()
  @IsNumber()
  readonly min_price?: number;

  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;

  @IsOptional()
  @IsDateString()
  readonly effective_date: string;
}
