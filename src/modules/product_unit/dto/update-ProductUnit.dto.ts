import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductUnitDto {
  @IsOptional()
  @IsNumber()
  product_variant_id?: number;

  @IsOptional()
  @IsNumber()
  unit_id?: number;

  @IsOptional()
  @IsNumber()
  quantity_per_unit?: number;

  @IsBoolean()
  is_base_unit?: boolean;
}
