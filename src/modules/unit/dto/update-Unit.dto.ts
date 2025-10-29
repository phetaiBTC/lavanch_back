import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateUnitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  name_en?: string;

  @IsOptional()
  @IsString()
  abbreviation?: string;
}
