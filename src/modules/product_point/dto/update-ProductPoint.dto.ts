import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
export class UpdateProductPointDto {
  @IsNotEmpty()
  product_variant_id: number;

  @IsNotEmpty()
  unit_id: number;

  @IsNumber()
  points_per_unit?: number;

  @IsDateString()
  effective_date: string;
}
