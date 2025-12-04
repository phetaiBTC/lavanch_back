import { IsOptional, IsString, IsNumber, IsBoolean, Matches, Length } from 'class-validator';

export class UpdateBranchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  village_id?: number;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Phone must contain only numbers' })
  @Length(10, 11, { message: 'Phone must be 10-11 digits' })
  phone?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsNumber()
  shifts_id?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
