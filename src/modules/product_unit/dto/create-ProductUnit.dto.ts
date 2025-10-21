import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductUnitDto {
  @IsNotEmpty()
  @IsNumber()
  product_variant_id: number;

  @IsNotEmpty()
  @IsNumber()
  unit_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity_per_unit: number;

  @IsBoolean()
  is_base_unit?: boolean;
}
