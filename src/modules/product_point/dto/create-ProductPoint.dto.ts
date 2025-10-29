import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateProductPointDto {
  @IsNotEmpty()
  product_variant_id: number;

  @IsNotEmpty()
  unit_id: number;

  @IsNumber()
  points_per_unit?: number;

  @IsBoolean()
  is_active: boolean;

  @IsDateString()
  effective_date: string;
}