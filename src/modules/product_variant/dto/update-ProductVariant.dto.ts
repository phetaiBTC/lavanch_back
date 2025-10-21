import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateProductVariantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  productId?: number;
}
