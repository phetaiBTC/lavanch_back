import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateProductVariantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
