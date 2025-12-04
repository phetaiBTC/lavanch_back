import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateProductVariantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsString()
  barcode: string;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsBoolean()
  is_active: boolean;
}
