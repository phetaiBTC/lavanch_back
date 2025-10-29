import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUnitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  name_en?: string;

  @IsOptional()
  @IsString()
  abbreviation?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
