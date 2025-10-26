import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTieredPriceDto {
  @IsNotEmpty()
  readonly product_variant_id: number;

  @IsNotEmpty()
  readonly unit_id: number;

  @IsNotEmpty()
  @IsInt()
  readonly min_quantity: number;

  @IsOptional()
  @IsInt()
  readonly max_quantity?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price_per_unit: number;

  @IsBoolean()
  readonly is_active: boolean;
}
